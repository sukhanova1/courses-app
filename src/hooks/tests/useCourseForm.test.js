import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useCourseForm from '../useCourseForm';

const mockedInitCourse = {
	title: 'JS',
	description: 'short descr',
	duration: 150,
	authors: ['1', '2', '3'],
};

const mockedInitialErrors = {
	authors: '',
	description: '',
	duration: '',
	title: '',
};

const mockedInitialIsDirty = {
	authors: false,
	description: false,
	duration: false,
	title: false,
};

describe('useCourseForm hook', () => {
	test('should accept and return initial course values', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		expect(result.current.course).toEqual(mockedInitCourse);
	});

	test('should return initial isDirty object', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		expect(result.current.isDirty).toEqual(mockedInitialIsDirty);
	});

	test('should return initial errors object in case of valid data', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		expect(result.current.errors).toEqual(mockedInitialErrors);
	});

	test('should handle change in inputs', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		act(() =>
			result.current.handleChange({ target: { name: 'title', value: 'PHP' } })
		);
		expect(result.current.course.title).toEqual('PHP');
	});

	test('should handle onBlur', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		act(() => {
			result.current.onBlur({ target: { name: 'title' } });
			result.current.onBlur({ target: { name: 'description' } });
		});
		expect(result.current.isDirty).toEqual({
			authors: false,
			description: true,
			duration: false,
			title: true,
		});
	});

	test('should handle updateDuration', () => {
		const { result } = renderHook(useCourseForm, {
			initialProps: mockedInitCourse,
		});
		act(() => {
			result.current.updateDuration({
				target: { name: 'duration', value: '120' },
			});
		});
		expect(result.current.course.duration).toEqual(120);
	});

	test('should handleAddAuthor and call addAuthor function', () => {
		const addAuthor = jest.fn();
		const { result } = renderHook(() =>
			useCourseForm(mockedInitCourse, addAuthor)
		);
		act(() => result.current.handleAddAuthor('4'));
		expect(addAuthor).toHaveBeenCalledTimes(1);
		expect(result.current.course.authors).toEqual(['1', '2', '3', '4']);
	});

	test('should handleDeleteAuthor and call deleteAuthor function', () => {
		const addAuthor = jest.fn();
		const deleteAuthor = jest.fn();
		const author = { name: 'author', id: '1' };
		const { result } = renderHook(() =>
			useCourseForm(mockedInitCourse, addAuthor, deleteAuthor)
		);
		act(() => result.current.handleDeleteAuthor(author));
		expect(deleteAuthor).toHaveBeenCalledTimes(1);
		expect(result.current.course.authors).toEqual(['2', '3']);
	});

	test('should handleSubmit and call submitForm function', () => {
		const addAuthor = jest.fn();
		const deleteAuthor = jest.fn();
		const submitForm = jest.fn();
		const e = { preventDefault: () => {} };
		const { result } = renderHook(() =>
			useCourseForm(mockedInitCourse, addAuthor, deleteAuthor, submitForm)
		);
		act(() => result.current.handleSubmit(e));
		expect(submitForm).toHaveBeenCalledTimes(1);
	});

	test('should handleSubmit and don not call submitForm function', () => {
		const addAuthor = jest.fn();
		const deleteAuthor = jest.fn();
		const submitForm = jest.fn();
		const e = { preventDefault: () => {} };
		const values = { title: 'J', description: '', duration: '0', authors: [] };
		const { result } = renderHook(() =>
			useCourseForm(values, addAuthor, deleteAuthor, submitForm)
		);
		act(() => result.current.handleSubmit(e));
		expect(submitForm).not.toHaveBeenCalledTimes(1);
		expect(result.current.errors).toEqual({
			authors: 'Author list can not be empty',
			description: 'Description should be at least 2 characters',
			duration: 'Course duration must be > 0',
			title: 'Title should be at least 2 characters',
		});
	});
});
