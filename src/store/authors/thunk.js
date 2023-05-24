import { fetchAddAuthor, fetchAllAuthors } from '../../services';
import { ADD_AUTHOR, GET_ALL_AUTHORS } from './actionTypes';

export const getAuthors = () => {
	return async (dispatch) => {
		const res = await fetchAllAuthors();
		const data = await res.json();
		if (res.ok) {
			return dispatch({ type: GET_ALL_AUTHORS, payload: data.result });
		}
	};
};

export const addAuthorThunk = (token, author) => {
	return async (dispatch) => {
		const res = await fetchAddAuthor(token, author);
		const data = await res.json();
		if (res.ok) {
			return dispatch({ type: ADD_AUTHOR, payload: data.result });
		}
	};
};
