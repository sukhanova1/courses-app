import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import { logout } from '../../store/users/thunk';
import { selectToken, selectUser } from '../../store/users/selectors';
import {
	BUTTON_LOGOUT,
	BUTTON_TYPE_BUTTON,
	BUTTON_LOGIN,
} from '../../constants';

import Logo from './components/Logo/Logo';
import './Header.css';

function Header() {
	const [disaplayButton, setDispalyButton] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const user = useSelector(selectUser);
	const token = useSelector(selectToken);

	const handleLogout = () => dispatch(logout(token));

	useEffect(() => {
		if (!user.isAuth && !localStorage.getItem('token')) {
			navigate('/courses');
		}
	}, [user.isAuth]);

	useEffect(() => {
		if (pathname === '/login' || pathname === '/registration') {
			setDispalyButton(false);
		}
	}, [pathname]);

	return (
		<div className='header'>
			<Logo />
			{user.isAuth && (
				<div>
					<span className='header__user-name'>{user.name}</span>
					<Button
						view={BUTTON_TYPE_BUTTON}
						text={BUTTON_LOGOUT}
						type={BUTTON_TYPE_BUTTON}
						onClick={handleLogout}
					/>
				</div>
			)}
			{!user.isAuth && disaplayButton && (
				<Button
					view={BUTTON_TYPE_BUTTON}
					text={BUTTON_LOGIN}
					type={BUTTON_TYPE_BUTTON}
					onClick={() => navigate('/login')}
				/>
			)}
		</div>
	);
}

export default Header;
