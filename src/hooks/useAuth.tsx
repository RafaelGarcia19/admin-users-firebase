import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	addDoc,
	deleteDoc,
	collection,
	Timestamp,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../context';
import { auth, firestore } from '../db/firebase';

type User = {
	uid: string;
	name: string;
	email: string;
};

export const useAuth = () => {
	const [error, setError] = useState<string | null>(null);
	const { onLogin, onLogout, authState } = useContext(AuthContext);

	const clearError = () => setError(null);

	const handleLogs = async (tipe: AuthLogAction, log: string) => {
		const logRef = collection(firestore, 'logs');
		await addDoc(logRef, {
			tipe,
			log,
			timestamp: Timestamp.now(),
		});
	};

	const handleRegister = async (
		email: string,
		password: string,
		name: string,
	) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			await setDoc(doc(firestore, 'users', user.uid), {
				name,
				email,
				uid: user.uid,
			});
			const idToken = await user.getIdToken();
			onLogin({
				name,
				email,
				token: idToken,
				loggedIn: true,
			});
			handleLogs('registerSuccess', `User ${email} registered`);
			handleLogs('loginSuccess', `User ${email} logged in`);
		} catch (error: FirebaseError | unknown) {
			const errorString = (error as FirebaseError).code;
			setError(errorString);
			handleLogs(
				'registerFailure',
				`User ${email} failed to register, error: ${errorString}`,
			);
		}
	};

	const handleDeleteUser = async (uid: string) => {
		try {
			const userDocRef = doc(firestore, 'users', uid);
			await deleteDoc(userDocRef);
			handleLogs(
				'deleteUserSuccess',
				`User ${uid} deleted by ${authState.email}`,
			);
		} catch (error: FirebaseError | unknown) {
			const errorString = (error as FirebaseError).code;
			setError(errorString);
			handleLogs(
				'deleteUserFailure',
				`User ${uid} failed to delete, error: ${errorString} by ${authState.email}`,
			);
		}
	};

	const handleEditUser = async (uid: string, name: string, email: string) => {
		try {
			const userDocRef = doc(firestore, 'users', uid);
			await setDoc(userDocRef, {
				name,
				email,
				uid,
			});
			handleLogs('editUserSuccess', `User ${uid} edited`);
		} catch (error: FirebaseError | unknown) {
			const errorString = (error as FirebaseError).code;
			setError(errorString);
			handleLogs(
				'editUserFailure',
				`User ${uid} failed to edit, error: ${errorString}`,
			);
		}
	};

	const handleLogin = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await user.getIdToken();
			const userId = user.uid;
			const userDocRef = doc(firestore, 'users', userId);
			const userSnap = await getDoc(userDocRef);
			const userData = userSnap.data();
			if (userData?.name) {
				const { name } = userData;
				onLogin({
					name,
					email,
					token: idToken,
					loggedIn: true,
				});
				handleLogs('loginSuccess', `User ${email} logged in`);
			} else {
				setError('User data incomplete');
				handleLogs(
					'loginFailure',
					`User ${email} failed to login, error: User data incomplete`,
				);
			}
		} catch (error) {
			const errorString =
				error instanceof FirebaseError ? error.code : 'Unknown error';
			setError(errorString);
			handleLogs(
				'loginFailure',
				`User ${email} failed to login, error: ${errorString}`,
			);
		}
	};

	const handleResetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			handleLogs('resetPasswordSuccess', `User ${email} reset password`);
		} catch (error) {
			setError(error instanceof FirebaseError ? error.code : 'Unknown error');
			handleLogs(
				'resetPasswordFailure',
				`User ${email} failed to reset password, error: ${error}`,
			);
		}
	};

	type AddUser = {
		name: string;
		email: string;
	};

	const handleAddUser = async ({ name, email }: AddUser) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				Math.random().toString(36).substring(7),
			);
			await setDoc(doc(firestore, 'users', user.uid), {
				name,
				email,
				uid: user.uid,
			});
			await sendPasswordResetEmail(auth, email);
			handleLogs('addUserSuccess', `User ${email} added by ${authState.email}`);
		} catch (error) {
			setError(error instanceof FirebaseError ? error.code : 'Unknown error');
			handleLogs(
				'addUserFailure',
				`User ${email} failed to add, error: ${error} by ${authState.email}`,
			);
		}
	};

	const handleLogout = () => {
		auth.signOut();
		onLogout();
		handleLogs(
			'logoutSuccess',
			`User ${authState.email} logged out successfully from ${window.location}`,
		);
	};

	const getUsers = async (): Promise<User[]> => {
		const usersRef = collection(firestore, 'users');
		const usersSnap = await getDocs(usersRef);
		const users: User[] = [];
		usersSnap.forEach((user) => {
			users.push(user.data() as User);
		});
		return users;
	};

	const getUser = async (uid: string): Promise<User | null> => {
		const userDocRef = doc(firestore, 'users', uid);
		const userSnap = await getDoc(userDocRef);
		if (userSnap.exists()) {
			return userSnap.data() as User;
		}
		return null;
	};

	return {
		error,
		clearError,
		handleRegister,
		handleLogin,
		handleResetPassword,
		handleLogout,
		handleDeleteUser,
		handleEditUser,
		handleAddUser,
		getUsers,
		getUser,
	};
};
