import { useEffect, useState } from 'react';

const useValidateUserForm = (user) => {
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (user.name !== undefined && !user.name.trim()) {
			setErrors((prev) => {
				return { ...prev, name: 'Name is required' };
			});
		} else {
			setErrors((prev) => {
				return { ...prev, name: '' };
			});
		}

		if (!user.email) {
			setErrors((prev) => {
				return { ...prev, email: 'Email is required' };
			});
		} else if (
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(user.email)
		) {
			setErrors((prev) => {
				return { ...prev, email: 'Email address is invalid' };
			});
		} else {
			setErrors((prev) => {
				return { ...prev, email: '' };
			});
		}

		if (!user.password) {
			setErrors((prev) => {
				return { ...prev, password: 'Password is required' };
			});
		} else if (user.password.length < 6) {
			setErrors((prev) => {
				return {
					...prev,
					password: 'Password is too short. It should be at least 6 characters',
				};
			});
		} else {
			setErrors((prev) => {
				return { ...prev, password: '' };
			});
		}
	}, [user]);

	return { errors };
};

export default useValidateUserForm;
