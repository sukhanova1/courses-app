import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Registration from '../../Registration/Registration';
import Login from '../Login';

let mockedState = {
	user: {
		isAuth: false,
		error: '',
		name: '',
		email: '',
		role: '',
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

const mockedUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedUseDispatch,
}));

const mockedUserData = {
	email: 'admin@email.com',
	password: '12345qwert',
};

describe('login comp', () => {
	beforeEach(() => mockedUseDispatch.mockClear());

	test('email input should be rendered', () => {
		render(<Login />, { wrapper });
		const { emailField, emailLabel } = getItems();
		expect(emailLabel).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
	});

	test('email input should change value', () => {
		render(<Login />, { wrapper });
		const { emailField } = getItems();
		fireEvent.change(emailField, { target: { value: mockedUserData.email } });
		expect(emailField.value).toBe(mockedUserData.email);
	});

	test('password input should be rendered', () => {
		render(<Login />, { wrapper });
		const { passField, passLabel } = getItems();
		expect(passLabel).toBeInTheDocument();
		expect(passField).toBeInTheDocument();
	});

	test('password input should change value', () => {
		render(<Login />, { wrapper });
		const { passField } = getItems();
		fireEvent.change(passField, { target: { value: mockedUserData.password } });
		expect(passField.value).toBe(mockedUserData.password);
	});

	test('login button should be rendered', () => {
		render(<Login />, { wrapper });
		const { button } = getItems();
		expect(button).toBeInTheDocument();
	});

	test('login button should call dispatch after click', async () => {
		render(<Login />, { wrapper });
		const user = userEvent.setup();
		const { emailField, passField, button } = getItems();
		await user.type(emailField, mockedUserData.email);
		await user.type(passField, mockedUserData.password);
		await user.click(button);
		expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
	});

	test('error should be rendered in case of empty input value', () => {
		render(<Login />, { wrapper });
		const { emailField, passField } = getItems();
		fireEvent.change(emailField, passField, { target: { value: '' } });
		fireEvent.focusOut(emailField);
		fireEvent.focusOut(passField);
		expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
		expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
	});

	test('email error should be rendered in case of invalid email', () => {
		render(<Login />, { wrapper });
		const { emailField } = getItems();
		fireEvent.change(emailField, { target: { value: 'email' } });
		fireEvent.focusOut(emailField);
		expect(screen.queryByText(/email address is invalid/i)).toBeInTheDocument();
	});

	test('password error should be rendered in case of invalid password', () => {
		render(<Login />, { wrapper });
		const { passField } = getItems();
		fireEvent.change(passField, { target: { value: '1234' } });
		fireEvent.focusOut(passField);
		expect(screen.queryByText(/Password is too short/i)).toBeInTheDocument();
	});

	test('errors should be rendered in case inputs value is empty after button click', async () => {
		render(<Login />, { wrapper });
		const { button } = getItems();
		const user = userEvent.setup();
		await user.click(button);
		expect(screen.getByText(/email is required/i)).toBeInTheDocument();
		expect(screen.getByText(/password is required/i)).toBeInTheDocument();
	});

	test('server error should be rendered in case of invalid user data', async () => {
		render(<Login />, { wrapper });
		const user = userEvent.setup();
		const { emailField, passField, button } = getItems();

		await user.type(emailField, mockedUserData.email);
		await user.type(passField, mockedUserData.password);
		await user.click(button);
		expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
	});

	test('register link should be rendered', () => {
		render(<Login />, { wrapper });
		expect(screen.getByText(/register/i)).toBeInTheDocument();
	});

	test('register link should navigate to /register', async () => {
		render(
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
			</Routes>,
			{ wrapper }
		);
		const { button } = getItems();
		const user = userEvent.setup();
		expect(button).toBeInTheDocument();
		await user.click(screen.getByText(/register here/i));
		expect(
			screen.queryByText(/If you have an account you can/i)
		).toBeInTheDocument();
	});
});

function getItems() {
	const emailField = screen.getByPlaceholderText(/enter email/i);
	const passField = screen.getByPlaceholderText(/enter password/i);
	const emailLabel = screen.getByLabelText(/email/i);
	const passLabel = screen.getByLabelText(/password/i);
	const button = screen.getByRole('button', { name: /login/i });
	return { emailField, passField, emailLabel, passLabel, button };
}

function wrapper({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/login']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}
