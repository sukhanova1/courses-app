import { useEffect, useState } from 'react';

const useValidateCourseForm = (course) => {
	const { title, description, duration, authors } = course;
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (title.length < 2) {
			setErrors((prev) => {
				return { ...prev, title: 'Title should be at least 2 characters' };
			});
		} else {
			setErrors((prev) => {
				return { ...prev, title: '' };
			});
		}

		if (description.length < 2) {
			setErrors((prev) => {
				return {
					...prev,
					description: 'Description should be at least 2 characters',
				};
			});
		} else {
			setErrors((prev) => {
				return { ...prev, description: '' };
			});
		}

		if (duration <= 0) {
			setErrors((prev) => {
				return { ...prev, duration: 'Course duration must be > 0' };
			});
		} else {
			setErrors((prev) => {
				return { ...prev, duration: '' };
			});
		}

		if (authors.length === 0) {
			setErrors((prev) => {
				return { ...prev, authors: 'Author list can not be empty' };
			});
		} else {
			setErrors((prev) => {
				return { ...prev, authors: '' };
			});
		}
	}, [course]);

	return { errors };
};

export default useValidateCourseForm;
