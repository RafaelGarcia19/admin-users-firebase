import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';

type ProtectedGuardProps = {
	children: JSX.Element | JSX.Element[];
};

export const ProtectedGuard = ({ children }: ProtectedGuardProps) => {
	const { authState } = useContext(AuthContext);

	if (authState.loggedIn) {
		return <Navigate to='/dashboard' />;
	}

	return <>{children}</>;
};
