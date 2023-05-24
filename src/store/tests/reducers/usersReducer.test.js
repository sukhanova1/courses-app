import user from '../../users/reducers';
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	GET_USERS_INFO_SUCCESS,
} from '../../users/actionTypes';

const mockedInitState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	error: '',
};

const mockedUser = { name: 'Admin', email: 'admin@email.com', role: 'admin' };

describe('users reducer', () => {
	it('should return initial state', () => {
		expect(user(undefined, {})).toEqual(mockedInitState);
	});

	it('should handle LOGIN_SUCCESS', () => {
		const action = {
			type: LOGIN_SUCCESS,
			payload: {
				result:
					'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
				user: mockedUser,
			},
		};
		expect(user(mockedInitState, action)).toEqual({
			isAuth: true,
			name: 'Admin',
			email: 'admin@email.com',
			token:
				'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
			role: '',
			error: '',
		});
	});

	it('should handle LOGIN_FAIL', () => {
		const action = {
			type: LOGIN_FAIL,
			payload: {
				result: 'Oops, something went wrong',
			},
		};

		expect(user(mockedInitState, action)).toEqual({
			isAuth: false,
			email: '',
			name: '',
			role: '',
			token: '',
			error: 'Oops, something went wrong',
		});
	});

	it('should handle LOGOUT_SUCCESS', () => {
		const state = {
			isAuth: true,
			name: 'Admin',
			email: 'admin@email.com',
			token: 'token',
			role: 'admin',
			error: '',
		};
		const action = {
			type: LOGOUT_SUCCESS,
		};
		expect(user(state, action)).toEqual(mockedInitState);
	});

	it('should handle GET_USERS_INFO_SUCCESS', () => {
		const action = {
			type: GET_USERS_INFO_SUCCESS,
			payload: {
				result: mockedUser,
			},
		};
		expect(user(mockedInitState, action)).toEqual({
			isAuth: true,
			name: 'Admin',
			email: 'admin@email.com',
			token: null,
			role: 'admin',
			error: '',
		});
	});
});
