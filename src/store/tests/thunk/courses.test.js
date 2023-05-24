import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../courses/thunk';

const mockedInitState = {
	user: { isAuth: true, name: 'Jhon Doe', role: 'admin' },
	courses: [],
	authors: [],
};

const middleware = [thunk];
const mockedStore = createMockStore(middleware);
const store = mockedStore(mockedInitState);

const mockedCoursesList = {
	result: [
		{
			title: 'JavaScript',
			description: 'short descr',
			duration: 906,
			authors: ['09eb3763-b6ff-4ff0-850f', '9987de6a-b475-484a-b885'],
			creationDate: '31/01/2023',
			id: '409aa710-d566',
		},
	],
};

const mockedCourse = {
	result: {
		title: 'PHP',
		description: 'descr',
		duration: 96,
		authors: ['09eb3763-b6ff', '9987de6a-b475'],
		creationDate: '31/01/2023',
		id: '409aa710-d678',
	},
};

// doesn't clear mocks
afterEach(() => jest.restoreAllMocks());

describe('courses thunk', () => {
	test('gets courses list correctly', () => {
		mockedFetch(mockedCoursesList);
		return store.dispatch(getCourses()).then(() => {
			const actual = store.getActions()[0];
			expect(actual.type).toBe('GET_ALL_COURSES_SUCCESS');
			expect(actual.payload).toEqual(mockedCoursesList.result);
		});
	});

	// test('adds course correctly', () => {
	// 	mockedFetch(mockedCourse);
	// 	return store.dispatch(addCourse('token', mockedCourse)).then(() => {
	// 		const actual = store.getActions()[0];
	// 		expect(actual.type).toBe('ADD_COURSE');
	// 		expect(actual.payload).toEqual(mockedCourse.result);
	// 	});
	// });

	// test('updates course correctly', () => {
	// 	mockedFetch(mockedCourse);
	// 	return store
	// 		.dispatch(updateCourse('token', mockedCourse, mockedCourse.result.id))
	// 		.then(() => {
	// 			const actual = store.getActions()[0];
	// 			expect(actual.type).toBe('UPDATE_COURSE');
	// 			expect(actual.payload).toEqual(mockedCourse.result);
	// 		});
	// });

	// test('deletes course correctly', () => {
	// 	const { id } = mockedCourse.result;
	// 	mockedFetch(id);
	// 	return store.dispatch(deleteCourse('token', id)).then(() => {
	// 		const actual = store.getActions()[0];
	// 		expect(actual.type).toBe('DELETE_COURSE');
	// 		expect(actual.payload).toEqual(id);
	// 	});
	// });
});

function mockedFetch(data) {
	jest
		.spyOn(window, 'fetch')
		.mockImplementationOnce(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
		);
}
