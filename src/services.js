import { BASE_URL } from './constants';

// users
export const fetchRegister = (userData) =>
	fetch(BASE_URL + '/register', {
		method: 'POST',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const fetchLogin = (userData) =>
	fetch(BASE_URL + '/login', {
		method: 'POST',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const fetchLogout = (token) =>
	fetch(BASE_URL + '/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

export const fetchUsersInfo = (token) =>
	fetch(BASE_URL + '/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

// courses
export const fetchAllCourses = () =>
	fetch(BASE_URL + '/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const fetchAddCourse = (token, courseData) =>
	fetch(BASE_URL + '/courses/add', {
		method: 'POST',
		body: JSON.stringify(courseData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

export const fetchUpdateCourse = (token, course, courseId) =>
	fetch(`${BASE_URL}/courses/${courseId}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

export const fetchDeleteCourse = (token, corseId) =>
	fetch(`${BASE_URL}/courses/${corseId}`, {
		method: 'DELETE',
		body: JSON.stringify({
			id: corseId,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

// authors
export const fetchAllAuthors = () =>
	fetch(BASE_URL + '/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const fetchAddAuthor = (token, authorData) =>
	fetch(BASE_URL + '/authors/add', {
		method: 'POST',
		body: JSON.stringify(authorData),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});
