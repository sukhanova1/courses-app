import {
	GET_USERS_INFO_SUCCESS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
} from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	error: '',
};

export default function user(state = userInitialState, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isAuth: false,
				error: action.payload.result,
			};
		case LOGOUT_SUCCESS:
			return userInitialState;
		case GET_USERS_INFO_SUCCESS:
			return {
				...state,
				isAuth: true,
				name: action.payload.result.name,
				email: action.payload.result.email,
				token: localStorage.getItem('token'),
				role: action.payload.result.role,
			};
		default:
			return state;
	}
}
