import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CourseCard from '../CourseCard';
import Courses from '../../../Courses';
import CourseInfo from '../../../../CourseInfo/CourseInfo';

const mockedCourse = {
	authors: [
		'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
		'5e0b0f18-32c9-4933-b142-50459b47f09e',
	],
	creationDate: '31/01/2023',
	description: 'PHP descr',
	duration: 600,
	id: '6cd13a85-c38f-4fa6-a758-3840910e88f6',
	title: 'PHP',
};

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: [mockedCourse],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedAuthors = 'author1, author 2';

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

describe('CourseCard comp', () => {
	test('course title should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText('PHP')).toBeInTheDocument();
	});

	test('course description should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText('PHP descr')).toBeInTheDocument();
	});

	test('course duration should be rendered in the correct format', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText('10:00 hours')).toBeInTheDocument();
	});

	test('course authors list should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText('author1, author 2')).toBeInTheDocument();
	});

	test('course creation date should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText('31/01/2023')).toBeInTheDocument();
	});

	test('show course button should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.getByText(/show course/i)).toBeInTheDocument();
	});

	test('show course link should navigate to /:courseId', async () => {
		render(
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>,
			{ wrapper }
		);
		const user = userEvent.setup();
		await user.click(screen.getByText(/show course/i));
		expect(screen.getByText(/back to courses/i)).toBeInTheDocument();
	});

	test('edit button should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.queryByAltText(/edit icon/i)).toBeInTheDocument();
	});

	test('edit button should navigate to /update/:courseId', async () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		const user = userEvent.setup();
		await user.click(screen.getByAltText(/edit icon/i));
		expect(mockedUseNavigate).toHaveBeenCalledWith('update/' + mockedCourse.id);
	});

	test('delete button should be rendered', () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		expect(screen.queryByAltText(/delete icon/i)).toBeInTheDocument();
	});

	test('delete button should dispatch delete action', async () => {
		render(<CourseCard course={mockedCourse} authors={mockedAuthors} />, {
			wrapper,
		});
		const user = userEvent.setup();
		await user.click(screen.getByAltText(/delete icon/i));
		expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
	});
});

function wrapper({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/courses']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}
