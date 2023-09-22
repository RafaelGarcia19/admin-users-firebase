import { useReducer } from 'react';
import { AuthContext, authReducer } from './';

interface props {
	children: JSX.Element | JSX.Element[];
}

const initialState: AuthState = {
	token: '',
	name: '',
	email: '',
	loggedIn: false,
};

const init = () => {
	try {
		const user = JSON.parse(localStorage.getItem('user') || '{}') as AuthState;
		return user;
	} catch (error) {
		return initialState;
	}
};

export const AuthProvider = ({ children }: props) => {
	const [authState, dispatch] = useReducer(authReducer, initialState, init);

	const onLogin = (data: AuthState) => {
		dispatch({ type: 'login', payload: data });
		localStorage.setItem('user', JSON.stringify(data));
	};

	const onLogout = () => {
		dispatch({ type: 'logout' });
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ authState, onLogin, onLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
