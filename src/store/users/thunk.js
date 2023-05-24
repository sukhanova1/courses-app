import { fetchLogin, fetchLogout, fetchUsersInfo } from '../../services';
import {
	GET_USERS_INFO_SUCCESS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
} from './actionTypes';

export const login = (userData) => {
	return async (dispatch) => {
		const res = await fetchLogin(userData);
		const data = await res.json();
		if (res.ok) {
			dispatch({ type: LOGIN_SUCCESS, payload: data });
			localStorage.setItem('token', data.result);
		} else {
			dispatch({ type: LOGIN_FAIL, payload: data });
		}
	};
};

export const logout = (token) => {
	return async (dispatch) => {
		const res = await fetchLogout(token);
		if (res.ok) {
			localStorage.removeItem('token');
			dispatch({
				type: LOGOUT_SUCCESS,
			});
		}
	};
};

export const getUserInfo = (token) => {
	return async (dispatch) => {
		const res = await fetchUsersInfo(token);
		const data = await res.json();
		if (res.ok) {
			dispatch({
				type: GET_USERS_INFO_SUCCESS,
				payload: data,
			});
		}
	};
};
