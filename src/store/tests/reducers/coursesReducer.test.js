import courses from '../../courses/reducers';
import {
	GET_ALL_COURSES_SUCCESS,
	ADD_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} from '../../courses/actionTypes';

const mockedInitialState = [];

const mockedPreviousState = [
	{
		title: 'JavaScript',
		description: 'short description',
		duration: 906,
		authors: ['09eb3763-b6ff-4ff0-850f-e86384d88343'],
		creationDate: '31/01/2023',
		id: '409aa710-d566-436a-bfa4-d4b4b218c9eb',
	},
];

const mockedCourseData = {
	title: 'JavaScript',
	description: 'short description',
	duration: 906,
	authors: [
		'09eb3763-b6ff-4ff0-850f-e86384d88343',
		'9987de6a-b475-484a-b885-622b8fb88bda',
	],
	creationDate: '31/01/2023',
	id: '409aa710-d566-436a-bfa4-d4b4b213c7eb',
};

describe('courses reducer', () => {
	test('should return initial state', () => {
		expect(courses(undefined, {})).toEqual(mockedInitialState);
	});

	test('should handle GET_ALL_COURSES_SUCCESS', () => {
		const action = {
			type: GET_ALL_COURSES_SUCCESS,
			payload: mockedInitialState,
		};
		expect(courses({}, action)).toEqual(mockedInitialState);
	});

	test('should handle ADD_COURSE to an empty list', () => {
		const action = {
			type: ADD_COURSE,
			payload: mockedCourseData,
		};
		expect(courses(mockedInitialState, action)).toEqual([mockedCourseData]);
	});

	test('should handle ADD_COURSE to an existing  list', () => {
		const action = {
			type: ADD_COURSE,
			payload: mockedCourseData,
		};
		expect(courses(mockedPreviousState, action)).toEqual([
			{
				title: 'JavaScript',
				description: 'short description',
				duration: 906,
				authors: ['09eb3763-b6ff-4ff0-850f-e86384d88343'],
				creationDate: '31/01/2023',
				id: '409aa710-d566-436a-bfa4-d4b4b218c9eb',
			},
			mockedCourseData,
		]);
	});

	test('should handle UPDATE_COURSE', () => {
		const updatedCourse = {
			title: 'JS',
			description: 'short descr',
			duration: 879,
			authors: ['09eb3763-b6ff-4ff0-850f-e86384d88343'],
			creationDate: '31/01/2023',
			id: '409aa710-d566-436a-bfa4-d4b4b218c9eb',
		};
		const action = {
			type: UPDATE_COURSE,
			payload: updatedCourse,
		};
		expect(courses(mockedPreviousState, action)).toEqual([updatedCourse]);
	});

	test('should handle DELETE_COURSE', () => {
		const courseId = '409aa710-d566-436a-bfa4-d4b4b218c9eb';
		const action = {
			type: DELETE_COURSE,
			payload: courseId,
		};
		expect(courses(mockedPreviousState, action)).toEqual(mockedInitialState);
	});
});
