type AuthAction =
	| { type: 'login'; payload: AuthState }
	| { type: 'logout' };

type AuthState = {
	loggedIn: boolean;
	token: string | null;
	name: string;
	email: string;
};
