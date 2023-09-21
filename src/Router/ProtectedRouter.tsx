import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context';

type ProtectedRouterProps = {
	children: JSX.Element | JSX.Element[];
};

export const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
	const { authState } = useContext(AuthContext);

	if (authState.loggedIn) {
		return <Navigate to='/dashboard' />;
	}

	return <>{children}</>;
};
