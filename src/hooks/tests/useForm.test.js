import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useForm from '../useForm';

const initVal = {
	email: 'admin@email.com',
	password: '123456',
	name: 'Admin',
};

const initErrors = {
	email: '',
	name: '',
	password: '',
};

describe('useForm hook', () => {
	test('should accept and return initial values', () => {
		const { result } = renderHook(useForm, {
			initialProps: initVal,
		});
		expect(result.current.values).toEqual(initVal);
	});

	test('should return the initial errors object in case of valid data', () => {
		const { result } = renderHook(useForm, {
			initialProps: initVal,
		});
		expect(result.current.errors).toEqual(initErrors);
	});

	test('should handle change in input', () => {
		const { result } = renderHook(useForm, {
			initialProps: initVal,
		});
		act(() =>
			result.current.handleChange({
				target: { name: 'email', value: 'newemail@email.com' },
			})
		);
		expect(result.current.values).toEqual({
			email: 'newemail@email.com',
			name: 'Admin',
			password: '123456',
		});
	});

	test('should handle onBlur', () => {
		const { result } = renderHook(() => useForm(initVal));
		act(() => result.current.onBlur({ target: { name: 'email' } }));
		expect(result.current.isDirty).toEqual({
			email: true,
			name: false,
			password: false,
		});
	});

	test('should handle onSubmit and call callback function', () => {
		const callback = jest.fn();
		const e = { preventDefault: () => {} };
		const { result } = renderHook(() => useForm(initVal, callback));
		act(() => result.current.handleSubmit(e));
		expect(callback).toHaveBeenCalledTimes(1);
	});

	test('should not call callback function in case of errors', () => {
		const callback = jest.fn();
		const e = { preventDefault: () => {} };
		const values = {
			email: 'email',
			password: '1234',
		};
		const { result } = renderHook(() => useForm(values, callback));
		act(() => result.current.handleSubmit(e));
		expect(callback).not.toHaveBeenCalled();
		expect(result.current.errors).toEqual({
			name: '',
			email: 'Email address is invalid',
			password: 'Password is too short. It should be at least 6 characters',
		});
	});
});
