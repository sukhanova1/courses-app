import { renderHook } from '@testing-library/react';

import useValidateCourseForm from '../useValidateCourseForm';

const mockedInitCourse = {
	title: '',
	description: '',
	duration: '',
	authors: '',
};

const mockedCourse = {
	title: 'JS',
	description: 'short descr',
	duration: 150,
	authors: [
		{ name: 'author', id: 1 },
		{ name: 'author', id: 2 },
	],
};

describe('useValidateCourseForm hook', () => {
	test('should return errors object in case of invalid data', () => {
		const { result } = renderHook(useValidateCourseForm, {
			initialProps: mockedInitCourse,
		});
		expect(result.current.errors).toEqual({
			authors: 'Author list can not be empty',
			description: 'Description should be at least 2 characters',
			duration: 'Course duration must be > 0',
			title: 'Title should be at least 2 characters',
		});
	});

	test('should return initial errors in case of valid data', () => {
		const { result } = renderHook(useValidateCourseForm, {
			initialProps: mockedCourse,
		});
		expect(result.current.errors).toEqual(mockedInitCourse);
	});
});
