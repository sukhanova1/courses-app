import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectUserRole } from '../../store/users/selectors';

function PrivateRoute({ children }) {
	const isAdmin = useSelector(selectUserRole);
	if (isAdmin !== 'admin') {
		return <Navigate to='/courses' />;
	}
	return <Outlet />;
}

export default PrivateRoute;
