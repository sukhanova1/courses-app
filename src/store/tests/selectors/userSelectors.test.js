import {
	selectUser,
	selectUserIsAuth,
	selectToken,
	selectUserRole,
} from '../../users/selectors';

const mockedState = {
	user: {
		isAuth: true,
		name: 'admin',
		email: 'admin123@gamil.com',
		token: 'token',
		role: 'admin',
		error: '',
	},
	courses: [],
	authors: [],
};

describe('user selector', () => {
	it('should select user data', () => {
		expect(selectUser(mockedState)).toEqual({
			isAuth: true,
			name: 'admin',
			email: 'admin123@gamil.com',
			token: 'token',
			role: 'admin',
			error: '',
		});
	});

	it('should select user isAuth status', () => {
		expect(selectUserIsAuth(mockedState)).toEqual(true);
	});

	it('should select user token', () => {
		expect(selectToken(mockedState)).toEqual('token');
	});

	it('should select user role', () => {
		expect(selectUserRole(mockedState)).toEqual('admin');
	});
});
