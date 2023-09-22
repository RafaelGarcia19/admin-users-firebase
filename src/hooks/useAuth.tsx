import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { auth, firestore } from '../db/firebase';

export const useAuth = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { onLogin, onLogout } = useContext(AuthContext);

	const clearError = () => setError(null);

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
			navigate('/dashboard');
		} catch (error: FirebaseError | unknown) {
			setError((error as FirebaseError).code);
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
				navigate('/dashboard');
			} else {
				setError('User data incomplete');
			}
		} catch (error) {
			setError(error instanceof FirebaseError ? error.code : 'Unknown error');
		}
	};

	const handleResetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			navigate('/login');
		} catch (error) {
			setError(error instanceof FirebaseError ? error.code : 'Unknown error');
		}
	};

	const handleLogout = () => {
		auth.signOut();
		onLogout();
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
