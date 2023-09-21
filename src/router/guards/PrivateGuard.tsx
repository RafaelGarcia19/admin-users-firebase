import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';

type PrivateGuardProps = {
	children: JSX.Element | JSX.Element[];
};

export const PrivateGuard = ({ children }: PrivateGuardProps) => {
	const { authState } = useContext(AuthContext);

	if (!authState.loggedIn) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};
