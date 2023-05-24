import { useState } from 'react';

import useValidateCourseForm from './useValidateCourseForm';
import { generateDate } from '../helpers/dateGeneratop';

const useCourseForm = (initState, addAuthor, deleteAuthor, submitForm) => {
	const [course, setCourse] = useState(initState);
	const [isDirty, setDirty] = useState({
		title: false,
		description: false,
		duration: false,
		authors: false,
	});

	const { errors } = useValidateCourseForm(course);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCourse((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const onBlur = (e) => {
		setDirty((prev) => {
			return { ...prev, [e.target.name]: true };
		});
	};

	const updateDuration = (e) => {
		setCourse((prev) => {
			return { ...prev, duration: +e.target.value };
		});
	};

	const updateCreationDate = () => {
		setCourse((prev) => {
			return { ...prev, creationDate: generateDate() };
		});
	};

	const handleAddAuthor = (id) => {
		addAuthor(id);
		setCourse((prev) => {
			return {
				...prev,
				authors: [...course.authors, id],
			};
		});
	};

	const handleDeleteAuthor = (author) => {
		deleteAuthor(author);
		setCourse((prev) => {
			return {
				...prev,
				authors: prev.authors.filter((el) => el !== author.id),
			};
		});
	};

	function handleSubmit(e) {
		e.preventDefault();
		updateCreationDate();
		if (course.authors.length === 0) {
			setDirty((prev) => {
				return { ...prev, authors: true };
			});
		}

		if (Object.values(isDirty).every((el) => el === false)) {
			setDirty((prev) => {
				return {
					...prev,
					title: true,
					description: true,
					duration: true,
					authors: true,
				};
			});
			alert('Plase, fill in all fields.');
		}

		if (Object.values(errors).every((el) => el === '')) {
			submitForm();
		}
	}

	return {
		course,
		isDirty,
		errors,
		handleChange,
		onBlur,
		updateDuration,
		handleAddAuthor,
		handleDeleteAuthor,
		handleSubmit,
	};
};

export default useCourseForm;
