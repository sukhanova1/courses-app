import {
	GET_ALL_COURSES_SUCCESS,
	DELETE_COURSE,
	ADD_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

const coursesInitialState = [];

export default function courses(state = coursesInitialState, action) {
	switch (action.type) {
		case GET_ALL_COURSES_SUCCESS:
			return action.payload;
		case ADD_COURSE:
			return [...state, action.payload];
		case UPDATE_COURSE: {
			const newArray = state.filter(
				(course) => course.id !== action.payload.id
			);
			newArray.push(action.payload);
			return newArray;
		}
		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
}
