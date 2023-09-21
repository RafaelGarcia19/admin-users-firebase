export type AuthContextType = {
	authState: AuthState;
	onLogin: (data: AuthState) => void;
	onLogout: () => void;
};