import { redirect } from 'react-router-dom';
import {
	fetchAddCourse,
	fetchAllCourses,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from '../../services';
import {
	GET_ALL_COURSES_SUCCESS,
	DELETE_COURSE,
	ADD_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const getCourses = () => {
	return async (dispatch) => {
		const res = await fetchAllCourses();
		const data = await res.json();
		if (res.ok) {
			return dispatch({ type: GET_ALL_COURSES_SUCCESS, payload: data.result });
		}
	};
};

export const addCourse = (token, course) => {
	return async (dispatch) => {
		const res = await fetchAddCourse(token, course);
		const data = await res.json();
		if (res.ok) {
			dispatch({ type: ADD_COURSE, payload: data.result });
			redirect('/courses');
		}
	};
};

export const updateCourse = (token, course, courseId) => {
	return async (dispatch) => {
		const res = await fetchUpdateCourse(token, course, courseId);
		const data = await res.json();
		if (res.ok) {
			redirect('/courses');
			return dispatch({ type: UPDATE_COURSE, payload: data.result });
		}
	};
};

export const deleteCourse = (token, courseId) => {
	return async (dispatch) => {
		const res = await fetchDeleteCourse(token, courseId);
		if (res.ok) {
			return dispatch({ type: DELETE_COURSE, payload: courseId });
		}
	};
};
