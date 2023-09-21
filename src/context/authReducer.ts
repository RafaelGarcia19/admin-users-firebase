export const authReducer = (
	state: AuthState,
	action: AuthAction,
): AuthState => {
	switch (action.type) {
		case 'login':
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case 'logout':
			return {
				...state,
				name: '',
				email: '',
				token: null,
			};
		default:
			return state;
	}
};
