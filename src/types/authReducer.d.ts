type AuthAction =
	| { type: 'login'; payload: AuthState }
	| { type: 'logout' };

type AuthState = {
	token: string | null;
	username: string;
	name: string;
	email: string;
};
