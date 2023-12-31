export const authReducer = (
	state: AuthState,
	action: AuthAction,
): AuthState => {
	switch (action.type) {
		case 'login':
			return {
				...state,
				...action.payload,
			};
		case 'logout':
			return {
				token: '',
				email: '',
				loggedIn: false,
				name: '',
			};
		default:
			return state;
	}
};
