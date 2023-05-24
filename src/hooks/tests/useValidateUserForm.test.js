import { renderHook } from '@testing-library/react';

import useValidateUserForm from '../useValidateUserForm';

const mockedInitUser = { email: '', name: '', password: '' };

const mockedUser = {
	name: 'Adam',
	email: 'adam@email.com',
	password: '1234qwer',
};

const mockedInvalidData = { name: 'Adam', email: 'adam', password: '1234' };

describe('useValidateUserForm hook', () => {
	test('should return initial errors in case of valid data', () => {
		const { result } = renderHook(useValidateUserForm, {
			initialProps: mockedUser,
		});
		expect(result.current.errors).toEqual(mockedInitUser);
	});

	test('should return errors object in case of empty fields', () => {
		const { result } = renderHook(useValidateUserForm, {
			initialProps: mockedInitUser,
		});
		expect(result.current.errors).toEqual({
			email: 'Email is required',
			name: 'Name is required',
			password: 'Password is required',
		});
	});

	test('should return errors object in case of invalid data', () => {
		const { result } = renderHook(useValidateUserForm, {
			initialProps: mockedInvalidData,
		});
		expect(result.current.errors).toEqual({
			email: 'Email address is invalid',
			name: '',
			password: 'Password is too short. It should be at least 6 characters',
		});
	});
});
