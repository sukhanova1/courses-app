import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Error from '../../common/Error/Error';
import useForm from '../../hooks/useForm';
import { login } from '../../store/users/thunk';
import { selectUser } from '../../store/users/selectors';
import {
	INPUT_EMAIL_LABEL,
	INPUT_TYPE_EMAIL,
	INPUT_EMAIL_LABEL_TEXT,
	INPUT_EMAIL_PLHOLDER,
	INPUT_PASSWORD_LABEL,
	INPUT_TYPE_PASSWORD,
	INPUT_PASSWORD_LABEL_TEXT,
	INPUT_PASSWORD_PLHOLDER,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TYPE_BUTTON,
	BUTTON_LOGIN,
} from '../../constants';

import './Login.css';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector(selectUser);

	const { values, errors, isDirty, handleChange, handleSubmit, onBlur } =
		useForm(
			{
				email: '',
				password: '',
			},
			handleLogin
		);

	function handleLogin() {
		return dispatch(login(values));
	}

	useEffect(() => {
		if (user.isAuth) {
			navigate('/courses');
		}
	}, [user.isAuth]);

	return (
		<div className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h1 className='login__title'>Login</h1>
				<div>
					<Input
						label={INPUT_EMAIL_LABEL}
						type={INPUT_TYPE_EMAIL}
						labelText={INPUT_EMAIL_LABEL_TEXT}
						placeHolderText={INPUT_EMAIL_PLHOLDER}
						value={values.email}
						onChange={handleChange}
						onBlur={onBlur}
					/>
					{isDirty.email && errors.email && <Error text={errors.email} />}
				</div>
				<div>
					<Input
						label={INPUT_PASSWORD_LABEL}
						type={INPUT_TYPE_PASSWORD}
						labelText={INPUT_PASSWORD_LABEL_TEXT}
						placeHolderText={INPUT_PASSWORD_PLHOLDER}
						value={values.password}
						onChange={handleChange}
						onBlur={onBlur}
					/>
					{isDirty.password && errors.password && (
						<Error text={errors.password} />
					)}
					{user.error && <Error text={user.error} />}
				</div>
				<Button
					view={BUTTON_TYPE_BUTTON}
					text={BUTTON_LOGIN}
					type={BUTTON_TYPE_SUBMIT}
					classname='login__button'
				/>
				<p className='login__text'>
					Don't have an account yet?{' '}
					<Link to='/registration' className='login__link'>
						Register here
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
