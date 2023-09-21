import { useReducer } from 'react';
import { AuthContext, authReducer } from './';

interface props {
	children: JSX.Element | JSX.Element[];
}

const initialState: AuthState = {
	token: '',
	username: '',
	name: '',
	email: '',
	loggedIn: false,
};

export const AuthProvider = ({ children }: props) => {
	const [authState, dispatch] = useReducer(authReducer, initialState);

	const onLogin = (data: AuthState) => {
		dispatch({ type: 'login', payload: data });
	};

	const onLogout = () => {
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{ authState, onLogin, onLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
