import { useState } from 'react';

import useValidateUserForm from '../hooks/useValidateUserForm';

const useForm = (initState, callback) => {
	const [values, setValues] = useState(initState);
	const [isDirty, setDirty] = useState({
		name: false,
		email: false,
		password: false,
	});
	const { errors } = useValidateUserForm(values);

	const handleChange = (e) => {
		const { name, value } = e.target;
		return setValues((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const onBlur = (e) => {
		setDirty((prev) => {
			return { ...prev, [e.target.name]: true };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.values(isDirty).every((el) => el === false)) {
			setDirty((prev) => {
				return { ...prev, name: true, email: true, password: true };
			});
		}
		if (Object.values(errors).every((el) => el === '')) {
			callback();
		}
	};

	return { values, errors, isDirty, handleChange, handleSubmit, onBlur };
};

export default useForm;
