import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEevent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedUseDispatch,
}));

describe('header comp', () => {
	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
	});

	test('logo should be rendered', () => {
		expect(screen.getByRole('img')).toBeInTheDocument();
	});

	test('user name should be rendered', () => {
		expect(screen.queryByText('Test Name')).toBeInTheDocument();
	});

	test('logout button should be rendered', () => {
		expect(screen.queryByText(/logout/i)).toBeInTheDocument();
	});

	test('logout button should dispatch action', async () => {
		const user = userEevent.setup();
		await user.click(screen.getByText(/logout/i));
		expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
	});
});
