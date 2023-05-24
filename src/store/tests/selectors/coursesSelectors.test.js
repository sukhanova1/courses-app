import { selectCourses, selectCourse } from '../../courses/selectors';

const mockedState = {
	user: {},
	courses: [
		{
			title: 'JavaScript',
			description: 'short descr',
			duration: 906,
			authors: ['09eb3763-b6ff-4ff0-850f', '9987de6a-b475-484a-b885'],
			creationDate: '31/01/2023',
			id: '409aa710-d566-436a-bfa4-d4b4b213c7eb',
		},
		{
			title: 'Python',
			description: 'new descr',
			duration: 884,
			authors: ['9987de6a-b475-484a-b885', '09eb3763-b6ff-4ff0-850f'],
			creationDate: '31/01/2023',
			id: '298d1b2c-ef9e-40d1-beeb-7c05731cd91f',
		},
	],
	authors: [],
};

describe('course selectors', () => {
	it('should select courses list from state', () => {
		expect(selectCourses(mockedState)).toEqual(mockedState.courses);
	});

	it('should select course item by id from state', () => {
		const id = '298d1b2c-ef9e-40d1-beeb-7c05731cd91f';

		expect(selectCourse(id)(mockedState)).toEqual({
			title: 'Python',
			description: 'new descr',
			duration: 884,
			authors: ['9987de6a-b475-484a-b885', '09eb3763-b6ff-4ff0-850f'],
			creationDate: '31/01/2023',
			id: '298d1b2c-ef9e-40d1-beeb-7c05731cd91f',
		});
	});
});
