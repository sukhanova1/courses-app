import { ADD_AUTHOR, GET_ALL_AUTHORS } from './actionTypes';

const authorsInitialState = [];

export default function authors(state = authorsInitialState, action) {
	switch (action.type) {
		case GET_ALL_AUTHORS:
			return action.payload;
		case ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
}
