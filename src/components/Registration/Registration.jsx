import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Error from '../../common/Error/Error';
import useForm from '../../hooks/useForm';
import { fetchRegister } from '../../services';
import {
	INPUT_NAME_PLHOLDER,
	INPUT_TYPE_TEXT,
	INPUT_NAME_LABEL,
	INPUT_NAME_LABEL_TEXT,
	INPUT_EMAIL_PLHOLDER,
	INPUT_EMAIL_LABEL,
	INPUT_EMAIL_LABEL_TEXT,
	INPUT_PASSWORD_PLHOLDER,
	INPUT_PASSWORD_LABEL,
	INPUT_PASSWORD_LABEL_TEXT,
	INPUT_TYPE_EMAIL,
	INPUT_TYPE_PASSWORD,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TYPE_BUTTON,
	BUTTON_REGISTRATION,
} from '../../constants';

import './Registration.css';

function Registration() {
	const navigate = useNavigate();

	const { values, errors, isDirty, handleChange, handleSubmit, onBlur } =
		useForm(
			{
				name: '',
				email: '',
				password: '',
			},
			handleRegistration
		);

	const [serverError, setServerError] = useState(null);

	async function handleRegistration(e) {
		const res = await fetchRegister(values);
		const data = await res.json();
		if (res.ok) {
			navigate('/login');
		} else {
			setServerError(data.errors[0]);
		}
	}

	return (
		<div className='registration'>
			<form className='registration__form' onSubmit={handleSubmit}>
				<h1 className='registration__title'>Registrartion</h1>
				<div>
					<Input
						label={INPUT_NAME_LABEL}
						type={INPUT_TYPE_TEXT}
						labelText={INPUT_NAME_LABEL_TEXT}
						placeHolderText={INPUT_NAME_PLHOLDER}
						value={values.name}
						onChange={handleChange}
						onBlur={onBlur}
					/>
					{isDirty.name && errors.name && <Error text={errors.name} />}
				</div>
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
					{serverError && <Error text={serverError} />}
				</div>
				<Button
					view={BUTTON_TYPE_BUTTON}
					text={BUTTON_REGISTRATION}
					type={BUTTON_TYPE_SUBMIT}
					classname='registration__button'
				/>
				<p>
					If you have an account you can{' '}
					<Link to='/login' className='registration__link'>
						login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Registration;
