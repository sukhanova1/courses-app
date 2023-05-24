import authors from '../../authors/reducers';
import { ADD_AUTHOR, GET_ALL_AUTHORS } from '../../authors/actionTypes';

const mockedInitState = [];

const mockedAuthor = { name: 'Author', id: '123456' };

const mockedAuthorsList = [
	{ name: 'author1', id: '12345' },
	{ name: 'Author', id: '123456' },
];

describe('authors reducer', () => {
	it('should return initial state', () => {
		expect(authors(undefined, {})).toEqual(mockedInitState);
	});

	it('should handle ADD_AUTHOR to an empty list', () => {
		const action = {
			type: ADD_AUTHOR,
			payload: mockedAuthor,
		};
		expect(authors(mockedInitState, action)).toEqual([mockedAuthor]);
	});

	it('should handle ADD_AUTHOR to an existing list', () => {
		const state = [{ name: 'author1', id: '12345' }];
		const action = {
			type: ADD_AUTHOR,
			payload: mockedAuthor,
		};
		expect(authors(state, action)).toEqual(mockedAuthorsList);
	});

	it('should handle GET_ALL_AUTHORS', () => {
		const action = {
			type: GET_ALL_AUTHORS,
			payload: mockedAuthorsList,
		};
		expect(authors(mockedInitState, action)).toEqual(mockedAuthorsList);
	});
});
