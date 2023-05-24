import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Courses from '../Courses';

let mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
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
			title: 'OOP',
			description: 'short descr',
			duration: 906,
			authors: ['09eb3763-b6ff-4ff0-850f', '9987de6a-b475-484a-b885'],
			creationDate: '31/01/2023',
			id: '409aa710-d566-436a-bfa4-d4b4b213c9eb',
		},
	],
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

describe('courses comp', () => {
	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
	});

	test('search input should be rendered', () => {
		expect(
			screen.getByPlaceholderText(/Search for course by name/i)
		).toBeInTheDocument();
	});

	test('should change value of search input', () => {
		const input = screen.getByPlaceholderText(/Search for course by name/i);
		fireEvent.change(input, { target: { value: 'js' } });
		expect(input.value).toBe('js');
	});

	test('search button should be rendered', () => {
		expect(screen.getByText(/search/i)).toBeInTheDocument();
	});

	test('should search courses after search button click', async () => {
		const user = userEvent.setup();
		const input = screen.getByPlaceholderText(/Search for course by name/i);
		fireEvent.change(input, { target: { value: 'java' } });
		await user.click(screen.getByText(/search/i));
		expect(screen.queryByText(/javascript/i)).toBeInTheDocument();
		expect(screen.queryByText(/oop/i)).not.toBeInTheDocument();
	});

	test('should display amount of CourseCard equal length of courses array', () => {
		const coursesList = screen.queryAllByText('Show course');
		expect(coursesList.length).toEqual(2);
	});

	test('should not display message if courses array length is > 0', () => {
		expect(
			screen.queryByText(/There is no courses.../i)
		).not.toBeInTheDocument();
	});

	test('add new course button should navigate /add after click', async () => {
		const user = userEvent.setup();
		await user.click(screen.getByText(/add new course/i));
		expect(mockedUseNavigate).toHaveBeenCalledWith('add');
	});
});
