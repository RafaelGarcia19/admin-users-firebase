import { FirebaseError } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
			onLogin({
				name: '',
				email,
				token: idToken,
				loggedIn: true,
			});
			navigate('/dashboard');
		} catch (error: FirebaseError | unknown) {
			setError((error as FirebaseError).code);
		}
	};

	const handleLogout = () => {
		auth.signOut();
		onLogout();
		navigate('/');
	};

	return { error, clearError, handleRegister, handleLogin, handleLogout };
};
