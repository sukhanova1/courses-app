import thunk from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { addAuthorThunk, getAuthors } from '../../authors/thunk';

const mockedInitState = {
	user: { isAuth: true, name: 'Test Name', role: 'admin' },
	courses: [],
	authors: [],
};

const middleware = [thunk];
const mockedStore = createMockStore(middleware);
const store = mockedStore(mockedInitState);

describe('authors thunk', () => {
	// doesn't clear mocks and tests fail
	beforeEach(() => {
		fetchMock.resetMocks();
		jest.restoreAllMocks();
	});

	test('gets authors list correctly', async () => {
		const data = {
			result: [
				{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439' },
				{ name: 'Author ', id: '09eb3763-b6ff-4ff0-850f' },
				{ name: 'new author ', id: '9987de6a-b475-484a-b885' },
			],
		};
		mockedFetch(data);
		return store.dispatch(getAuthors()).then(() => {
			const actual = store.getActions()[0];
			expect(actual.type).toEqual('GET_ALL_AUTHORS');
			expect(actual.payload).toEqual(data.result);
		});
	});

	// test('adds author correctly', async () => {
	// 	const data = { result: { name: 'test Author', id: '1234' } };
	// 	mockedFetch(data);
	// 	return store
	// 		.dispatch(addAuthorThunk('token', { name: 'name' }))
	// 		.then(() => {
	// 			const actual = store.getActions()[0];
	// 			expect(actual.type).toEqual('ADD_AUTHOR');
	// 			expect(actual.payload).toEqual(data.result);
	// 		});
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
