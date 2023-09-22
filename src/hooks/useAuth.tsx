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
	addDoc,
	collection,
	Timestamp,
} from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { auth, firestore } from '../db/firebase';

export const useAuth = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
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
			navigate('/dashboard');
		} catch (error: FirebaseError | unknown) {
			const errorString = (error as FirebaseError).code;
			setError(errorString);
			handleLogs(
				'registerFailure',
				`User ${email} failed to register, error: ${errorString}`,
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
				navigate('/dashboard');
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
			navigate('/login');
		} catch (error) {
			setError(error instanceof FirebaseError ? error.code : 'Unknown error');
			handleLogs(
				'resetPasswordFailure',
				`User ${email} failed to reset password, error: ${error}`,
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
		navigate('/');
	};

	return {
		error,
		clearError,
		handleRegister,
		handleLogin,
		handleResetPassword,
		handleLogout,
	};
};
