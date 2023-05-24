import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from 'react-router';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CourseForm from '../CourseForm';

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
			id: '409aa710-d566',
		},
	],
	authors: [
		{ name: 'author123', id: '9b87e8b8-6ba5-40fc-a439' },
		{ name: 'Author ', id: '09eb3763-b6ff-4ff0-850f' },
		{ name: 'new author ', id: '9987de6a-b475-484a-b885' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedUseNavigate = jest.fn();

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: () => jest.fn(),
	useNavigate: () => mockedUseNavigate,
}));

const mockedUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedUseDispatch,
}));

const newCourse = {
	title: 'php',
	description: 'descr',
	duration: '500',
	authors: ['12345'],
};

describe('course form comp', () => {
	describe('course form comp with /add route', () => {
		beforeEach(() => {
			render(<CourseForm />, { wrapper: renderWithAddRoute });
			mockedUseDispatch.mockClear();
			mockedUseNavigate.mockClear();
		});

		test('title input should be rendered', () => {
			const { titleField, titleLabel } = getFormFields();
			expect(titleField).toBeInTheDocument();
			expect(titleField).toHaveValue('');
			expect(titleLabel).toBeInTheDocument();
		});

		test('descr input should be rendered', () => {
			const { descrField, descrLabel } = getFormFields();
			expect(descrField).toBeInTheDocument();
			expect(descrField).toHaveValue('');
			expect(descrLabel).toBeInTheDocument();
		});

		test('author input should be rendered', () => {
			const { authorField } = getFormFields();
			expect(authorField).toBeInTheDocument();
			expect(authorField).toHaveValue('');
		});

		test('duration input should be rendered', () => {
			const { durationField } = getFormFields();
			expect(durationField).toBeInTheDocument();
			expect(durationField).toHaveValue(0);
		});
		test('create author button should be rebdered', () => {
			const { createAuthor } = getFormButtons();
			expect(createAuthor).toBeInTheDocument();
		});

		test('duration paragraph should be rendered with 00:00 hours', () => {
			expect(screen.queryByText(/00:00/i)).toBeInTheDocument();
		});

		test('create course button should be rendered', () => {
			const { createCourse } = getFormButtons();
			expect(createCourse).toBeInTheDocument();
		});

		test('course authors list should be empty and message should be rendered', () => {
			expect(screen.queryByText(/author list is empty/i)).toBeInTheDocument();
		});

		test('authors list and add authors buttons should equal length of courses array', () => {
			const container = document.querySelectorAll('.form__author-box');
			const { addAuthor } = getFormButtons();
			expect(container.length).toBe(3);
			expect(addAuthor.length).toBe(3);
			expect(screen.queryByText('Author')).toBeInTheDocument();
		});

		test('form inputs should handle change', () => {
			const { titleField, descrField, authorField, durationField } =
				getFormFields();
			fireEvent.change(titleField, { target: { value: newCourse.title } });
			fireEvent.change(descrField, {
				target: { value: newCourse.description },
			});
			fireEvent.change(authorField, { target: { value: 'author' } });
			fireEvent.change(durationField, {
				target: { value: newCourse.duration },
			});
			expect(titleField.value).toBe(newCourse.title);
			expect(descrField.value).toBe(newCourse.description);
			expect(authorField.value).toBe('author');
			expect(durationField.value).toBe(newCourse.duration);
		});

		test('title error should be rendered on focus out in case of invalid data', () => {
			const { titleField } = getFormFields();
			fireEvent.change(titleField, { target: { value: 't' } });
			fireEvent.focusOut(titleField);
			expect(
				screen.queryByText(/title should be at least 2 characters/i)
			).toBeInTheDocument();
		});

		test('description errors should be rendered on focus out in case of invalid data', () => {
			const { descrField } = getFormFields();
			fireEvent.change(descrField, { target: { value: 't' } });
			fireEvent.focusOut(descrField);
			expect(
				screen.queryByText(/Description should be at least 2 characters/i)
			).toBeInTheDocument();
		});

		test('duration errors should be rendered on focus out in case of invalid data', () => {
			const { durationField } = getFormFields();
			fireEvent.focusOut(durationField);
			expect(
				screen.queryByText(/Course duration must be > 0/i)
			).toBeInTheDocument();
		});

		test('alert should be called after create course button click in case of empty values in inputs', async () => {
			const mockedAlert = jest.spyOn(window, 'alert').mockImplementation();
			const { createCourse } = getFormButtons();
			const user = userEvent.setup();
			await user.click(createCourse);
			expect(mockedAlert).toHaveBeenCalledWith('Plase, fill in all fields.');
			expect(
				screen.queryByText(/Author list can not be empty/i)
			).toBeInTheDocument();
		});

		test('create course button should call dispatch after click', async () => {
			const { titleField, descrField, durationField } = getFormFields();
			const { createCourse, addAuthor } = getFormButtons();
			const user = userEvent.setup();
			await user.type(titleField, newCourse.title);
			await user.type(descrField, newCourse.description);
			await user.type(durationField, newCourse.duration);
			await user.click(addAuthor[0]);
			await user.click(createCourse);
			expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
			expect(mockedUseNavigate).toHaveBeenCalledWith('/courses');
		});

		test('create author button should handle click and created author should appear on the page', async () => {
			const { authorField } = getFormFields();
			const { createAuthor } = getFormButtons();
			const user = userEvent.setup();
			await user.type(authorField, 'john snow');
			await user.click(createAuthor);
			expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
		});
	});

	describe('course form comp with update/:courseId route', () => {
		beforeEach(() => {
			jest
				.spyOn(Router, 'useParams')
				.mockReturnValue({ courseId: '409aa710-d566' });
			render(<CourseForm />, { wrapper: renderWithUpdateRoute });
			mockedUseDispatch.mockClear();
			mockedUseNavigate.mockClear();
		});

		test('title input should be rendered with course title value', () => {
			const { titleField } = getFormFields();
			expect(titleField).toHaveValue('JavaScript');
		});

		test('description input should be rendered with description value', () => {
			const { descrField } = getFormFields();
			expect(descrField).toHaveValue('short descr');
		});

		test('duration input and paragraph should be rendered with course duration value', () => {
			const { durationField } = getFormFields();
			expect(durationField).toHaveValue(906);
			expect(screen.getByText('15:06')).toBeInTheDocument();
		});

		test('authors list should be rendered without course authors', () => {
			const { addAuthor } = getFormButtons();
			expect(addAuthor).toHaveLength(1);
			expect(screen.getByText('author123')).toBeInTheDocument();
		});

		test('course authors list should be rendered', () => {
			const { deleteAuthor } = getFormButtons();
			expect(deleteAuthor).toHaveLength(2);
			expect(screen.getByText('Author')).toBeInTheDocument();
			expect(screen.getByText('new author')).toBeInTheDocument();
		});

		test('update course button should be rendered', () => {
			const { updateCourse } = getFormButtons();
			expect(updateCourse).toBeInTheDocument();
		});

		test('update course button should call dispatch after click', async () => {
			const { titleField, durationField } = getFormFields();
			const { updateCourse } = getFormButtons();
			const user = userEvent.setup();
			await user.type(titleField, newCourse.title);
			await user.type(durationField, newCourse.duration);
			await user.click(updateCourse);
			expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
			expect(mockedUseNavigate).toHaveBeenCalledWith('/courses');
		});

		test('add author button should handle click and author should appear in course authors list', async () => {
			const { addAuthor } = getFormButtons();
			const user = userEvent.setup();
			await user.click(addAuthor[0]);
			const deleteAuthor = screen.queryAllByRole('button', {
				name: /delete author/i,
			});
			expect(
				screen.queryAllByRole('button', {
					name: /add author/i,
				})
			).toEqual([]);
			expect(deleteAuthor.length).toBe(3);
			expect(deleteAuthor[2].previousSibling).toHaveTextContent('author123');
		});

		test('delete author button should handle click and author should be removed from course authors list', async () => {
			const { deleteAuthor } = getFormButtons();
			const user = userEvent.setup();
			await user.click(deleteAuthor[0]);
			const addAuthor = screen.queryAllByRole('button', {
				name: /add author/i,
			});
			expect(
				screen.queryAllByRole('button', {
					name: /delete author/i,
				}).length
			).toBe(1);
			expect(addAuthor.length).toBe(2);
			expect(addAuthor[1].previousSibling).toHaveTextContent('Author');
		});
	});
});

function renderWithUpdateRoute({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/courses/update/409aa710-d566']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}

function renderWithAddRoute({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/courses/add']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}

function getFormFields() {
	const titleField = screen.getByPlaceholderText(/enter title/i);
	const descrField = screen.getByPlaceholderText(/enter description/i);
	const authorField = screen.getByPlaceholderText(/enter author name/i);
	const durationField = screen.getByPlaceholderText(/enter duration/i);

	const titleLabel = screen.getByLabelText(/title/i);
	const descrLabel = screen.getByLabelText(/description/i);

	return {
		titleField,
		descrField,
		authorField,
		durationField,
		titleLabel,
		descrLabel,
	};
}

function getFormButtons() {
	const createCourse = screen.queryByRole('button', { name: /create course/i });
	const updateCourse = screen.queryByRole('button', {
		name: /update course/i,
	});
	const createAuthor = screen.queryByRole('button', { name: /create author/i });
	const addAuthor = screen.queryAllByRole('button', { name: /add author/i });
	const deleteAuthor = screen.queryAllByRole('button', {
		name: /delete author/i,
	});
	return { createCourse, updateCourse, createAuthor, addAuthor, deleteAuthor };
}
