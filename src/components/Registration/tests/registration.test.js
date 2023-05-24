import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import Login from '../../Login/Login';
import Registration from '../Registration';

let mockedState = {
	user: {
		isAuth: false,
		error: '',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

const mockedData = {
	name: 'Admin',
	email: 'admin@email.com',
	password: '12345qwert',
};

describe('registration comp', () => {
	beforeEach(() => mockedUseNavigate.mockClear());

	test('name input should be rendered', () => {
		render(<Registration />, { wrapper });
		const { nameField, nameLabel } = getItems();
		expect(nameField).toBeInTheDocument();
		expect(nameLabel).toBeInTheDocument();
	});

	test('name input should change value', () => {
		render(<Registration />, { wrapper });
		const { nameField } = getItems();
		fireEvent.change(nameField, { target: { value: mockedData.name } });
		expect(nameField.value).toBe(mockedData.name);
	});

	test('email input should be rendered', () => {
		render(<Registration />, { wrapper });
		const { emailField, emailLabel } = getItems();
		expect(emailLabel).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
	});

	test('email input should change value', () => {
		render(<Registration />, { wrapper });
		const { emailField } = getItems();
		fireEvent.change(emailField, {
			target: { value: mockedData.password },
		});
		expect(emailField.value).toBe(mockedData.password);
	});

	test('password input should be rendered', () => {
		render(<Registration />, { wrapper });
		const { passField, passLabel } = getItems();
		expect(passField).toBeInTheDocument();
		expect(passLabel).toBeInTheDocument();
	});

	test('password input should change value', () => {
		render(<Registration />, { wrapper });
		const { passField } = getItems();
		fireEvent.change(passField, { target: { value: mockedData.password } });
		expect(passField.value).toBe(mockedData.password);
	});

	test('register button should be rendered', () => {
		render(<Registration />, { wrapper });
		const { button } = getItems();
		expect(button).toBeInTheDocument();
	});

	test('register button should call navigate after click', async () => {
		jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ result: 'Invalid data' }),
			})
		);
		render(<Registration />, { wrapper });
		const { nameField, emailField, passField, button } = getItems();
		const user = userEvent.setup();
		await user.type(nameField, mockedData.name);
		await user.type(emailField, mockedData.email);
		await user.type(passField, mockedData.password);
		await user.click(button);
		expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
		expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
	});

	test('error should be rendered in case of empty input value', () => {
		render(<Registration />, { wrapper });
		const { nameField, emailField, passField } = getItems();
		fireEvent.change(nameField, emailField, passField, {
			target: { value: '' },
		});
		fireEvent.focusOut(nameField);
		fireEvent.focusOut(emailField);
		fireEvent.focusOut(passField);
		expect(screen.queryByText(/name is required/i)).toBeInTheDocument();
		expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
		expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
	});

	test('email error should be rendered in case of invalid email', () => {
		render(<Registration />, { wrapper });
		const { emailField } = getItems();
		fireEvent.change(emailField, { target: { value: 'email' } });
		fireEvent.focusOut(emailField);
		expect(screen.queryByText(/email address is invalid/i)).toBeInTheDocument();
	});

	test('password error should be rendered in case of invalid password', () => {
		render(<Registration />, { wrapper });
		const { passField } = getItems();
		fireEvent.change(passField, { target: { value: '1234' } });
		fireEvent.focusOut(passField);
		expect(screen.queryByText(/Password is too short/i)).toBeInTheDocument();
	});

	test('errors should be rendered in case input values are empty after button click', async () => {
		render(<Registration />, { wrapper });
		const { button } = getItems();
		const user = userEvent.setup();
		await user.click(button);
		expect(screen.getByText(/name is required/i)).toBeInTheDocument();
		expect(screen.getByText(/email is required/i)).toBeInTheDocument();
		expect(screen.getByText(/password is required/i)).toBeInTheDocument();
	});

	test('server error should be rendered in case of invalid user data', async () => {
		jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ errors: ['error'] }),
			})
		);
		render(<Registration />, { wrapper });
		const user = userEvent.setup();
		const { nameField, emailField, passField, button } = getItems();
		await user.type(nameField, mockedData.name);
		await user.type(emailField, mockedData.email);
		await user.type(passField, mockedData.password);
		await user.click(button);
		await waitFor(async () => {
			expect(screen.queryByText(/error/i)).toBeInTheDocument();
		});
	});

	test('login link should be rendered', () => {
		render(<Registration />, { wrapper });
		expect(screen.getByText(/login/i)).toBeInTheDocument();
	});

	test('login link should navigate to /login', async () => {
		render(
			<Routes>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
			</Routes>,
			{ wrapper }
		);
		const user = userEvent.setup();
		const { button } = getItems();
		expect(button).toBeInTheDocument();
		await user.click(screen.getByText(/login/i));
		expect(
			await screen.findByText(/Don't have an account yet/i)
		).toBeInTheDocument();
	});
});

function getItems() {
	const nameField = screen.getByPlaceholderText(/enter name/i);
	const emailField = screen.getByPlaceholderText(/enter email/i);
	const passField = screen.getByPlaceholderText(/enter password/i);
	const nameLabel = screen.getByLabelText(/name/i);
	const emailLabel = screen.getByLabelText(/email/i);
	const passLabel = screen.getByLabelText(/password/i);
	const button = screen.getByRole('button', { name: /registration/i });
	return {
		nameField,
		emailField,
		passField,
		nameLabel,
		emailLabel,
		passLabel,
		button,
	};
}

function wrapper({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/registration']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}
