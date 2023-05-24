import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getUserInfo, login, logout } from '../../users/thunk';

const mockedInitState = {
	user: { isAuth: true, name: 'John Doe', role: 'admin' },
	courses: [],
	authors: [],
};

const middleware = [thunk];
const mockedStore = createMockStore(middleware);
const store = mockedStore(mockedInitState);

const mockedUserData = {
	result: {
		email: 'admin123@email.com',
		password: '123456',
	},
};

const mockedUsersInfo = {
	result: {
		name: 'John Doe',
		email: 'admin@email.com',
		password: 'admin123',
		role: 'admin',
		id: '85aa767d',
	},
};

// doesn't clear mocks
afterEach(() => jest.restoreAllMocks());

describe('users thunk', () => {
	test('logins successfuly', () => {
		mockedFetch('token');
		return store.dispatch(login(mockedUserData)).then(() => {
			const actual = store.getActions()[0];
			expect(actual.type).toBe('LOGIN_SUCCESS');
			expect(actual.payload).toBe('token');
		});
	});

	// test('login fails', () => {
	// 	jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
	// 		Promise.resolve({
	// 			ok: false,
	// 			json: () => Promise.resolve('error'),
	// 		})
	// 	);
	// 	return store.dispatch(login(mockedUserData)).then(() => {
	// 		const actual = store.getActions()[0];
	// 		expect(actual.type).toBe('LOGIN_FAIL');
	// 		expect(actual.payload).toBe('error');
	// 	});
	// });

	// test('logouts successfuly', () => {
	// 	mockedFetch('token');
	// 	return store.dispatch(logout('token')).then(() => {
	// 		const actual = store.getActions()[0];
	// 		expect(actual.type).toBe('LOGOUT_SUCCESS');
	// 		expect(actual.payload).toEqual(undefined);
	// 	});
	// });

	// test('gets users info successfuly', () => {
	// 	mockedFetch(mockedUsersInfo);
	// 	return store.dispatch(getUserInfo('token')).then(() => {
	// 		const actual = store.getActions()[0];
	// 		expect(actual.type).toBe('GET_USERS_INFO_SUCCESS');
	// 		expect(actual.payload).toEqual(mockedUsersInfo);
	// 	});
	// });
});

function mockedFetch(data) {
	jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(data),
		})
	);
}
