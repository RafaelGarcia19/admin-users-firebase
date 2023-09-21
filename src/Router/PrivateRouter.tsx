import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context';

type PrivateRouterProps = {
	children: JSX.Element | JSX.Element[];
};

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
	const { authState } = useContext(AuthContext);

	if (!authState.loggedIn) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};
