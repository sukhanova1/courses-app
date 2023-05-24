import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Router from 'react-router';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CourseInfo from '../CourseInfo';
import Courses from '../../Courses/Courses';

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
			authors: ['09eb3763-b6ff-4ff0-850f', '9b87e8b8-6ba5-40fc-a439'],
			creationDate: '31/01/2023',
			id: '409aa710-d566-436a',
		},
		{
			title: 'OOP',
			description: 'short descr',
			duration: 906,
			authors: ['09eb3763-b6ff-4ff0-850f', '9b87e8b8-6ba5-40fc-a439'],
			creationDate: '31/01/2023',
			id: '409aa710-d566-436a-bfa4-d4b4b213c9eb',
		},
	],
	authors: [
		{ name: 'Jack', id: '9b87e8b8-6ba5-40fc-a439' },
		{ name: 'John ', id: '09eb3763-b6ff-4ff0-850f' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: () => jest.fn(),
}));

describe('course info comp', () => {
	beforeEach(() => {
		jest
			.spyOn(Router, 'useParams')
			.mockReturnValue({ courseId: '409aa710-d566-436a' });
	});

	test('back to courses link should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.getByText(/< back to courses/i)).toBeInTheDocument();
	});

	test('back to courses link should redirect to /courses page', async () => {
		render(
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>,
			{ wrapper }
		);
		const user = userEvent.setup();
		expect(screen.getByText(/< back to courses/i)).toBeInTheDocument();
		await user.click(screen.getByText(/back to courses/i));
		expect(screen.getByText(/search/i)).toBeInTheDocument();
	});

	test('course titlle should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/javascript/i)).toBeInTheDocument();
	});

	test('course description should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/short descr/i)).toBeInTheDocument();
	});

	test('course id should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/409aa710-d566-436a/i)).toBeInTheDocument();
	});

	test('course duration should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/15:06 hours/i)).toBeInTheDocument();
	});

	test('course creation date should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/31\/01\/2023/i)).toBeInTheDocument();
	});

	test('course authors list should be rendered', () => {
		render(<CourseInfo />, { wrapper });
		expect(screen.queryByText(/john/i)).toBeInTheDocument();
		expect(screen.queryByText(/jack/i)).toBeInTheDocument();
	});
});

function wrapper({ children }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return (
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={['/courses/409aa710-d566-436a']}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MemoryRouter>
		</Provider>
	);
}
