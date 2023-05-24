import { selectAuthors } from '../../authors/selectors';

const mockedState = {
	user: {},
	courses: [],
	authors: [
		{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439' },
		{ name: 'Author ', id: '09eb3763-b6ff-4ff0-850f' },
	],
};

describe('authors selector', () => {
	it('should select authors list from empty list', () => {
		expect(selectAuthors(mockedState)).toEqual(mockedState.authors);
	});
});
