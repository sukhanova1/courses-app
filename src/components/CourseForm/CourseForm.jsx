import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Error from '../../common/Error/Error';
import useCourseForm from '../../hooks/useCourseForm';
import { selectAuthors } from '../../store/authors/selectors';
import { selectToken } from '../../store/users/selectors';
import { selectCourse } from '../../store/courses/selectors';
import { getCourses, updateCourse } from '../../store/courses/thunk';
import { addAuthorThunk } from '../../store/authors/thunk';
import { getUserInfo } from '../../store/users/thunk';
import { getAuthors } from '../../store/authors/thunk';
import { addCourse } from '../../store/courses/thunk';
import { convertIntoHours } from '../../helpers/pipeDuration';
import {
	getCourseAuthors,
	removeCourseAuthors,
} from '../../helpers/pipeAuthors';
import {
	BUTTON_CREATE_COURSE,
	BUTTON_UPDATE_COURSE,
	INPUT_COURSE_TITLE_PLHOLDER,
	INPUT_COURSE_TITLE_LABEL,
	INPUT_COURSE_DESCR_LABEL,
	INPUT_COURSE_DESCR_PLHOLDER,
	INPUT_COURSE_DESCR_LABEL_TEXT,
	BUTTON_CREATE_AUTHOR,
	INPUT_NAME_LABEL,
	INPUT_COURSE_TITLE_LABEL_TEXT,
	INPUT_AUTHOR_NAME_PLHOLDER,
	INPUT_COURSE_DURATION_PLHOLDER,
	INPUT_COURSE_DURATION_LABEL,
	BUTTON_ADD_AUTHOR,
	BUTTON_DELETE_AUTHOR,
	BUTTON_TYPE_SUBMIT,
	BUTTON_TYPE_BUTTON,
	INPUT_TYPE_TEXT,
	INPUT_TYPE_NUMBER,
} from '../../constants';

import './CourseForm.css';

function CourseForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { courseId } = useParams();
	const selectedCourse = useSelector(selectCourse(courseId));
	const selectedAuthors = useSelector(selectAuthors);
	const token = useSelector(selectToken);

	const initCourse = {
		title: courseId ? selectedCourse.title : '',
		description: courseId ? selectedCourse.description : '',
		creationDate: courseId ? selectedCourse.creationDate : '',
		duration: courseId ? selectedCourse.duration : 0,
		authors: courseId ? selectedCourse.authors : [],
	};

	const {
		course,
		isDirty,
		errors,
		handleChange,
		onBlur,
		updateDuration,
		handleAddAuthor,
		handleDeleteAuthor,
		handleSubmit,
	} = useCourseForm(initCourse, addAuthor, deleteAuthor, submitForm);

	const [authorName, setAuthorName] = useState('');
	const [authorsList, setAuthorsList] = useState(
		removeCourseAuthors(course.authors, [...selectedAuthors])
	);

	const updateAuthor = (e) => setAuthorName(e.target.value);

	function createAuthor() {
		const payload = { name: authorName };
		dispatch(addAuthorThunk(token, payload));
		setAuthorName('');
	}

	function addAuthor(id) {
		setAuthorsList((prev) => {
			return prev.filter((el) => el.id !== id);
		});
	}

	function deleteAuthor(author) {
		setAuthorsList((prev) => {
			return [...prev, author];
		});
	}

	function submitForm() {
		if (!courseId) {
			dispatch(addCourse(token, course));
			return navigate('/courses');
		} else {
			dispatch(updateCourse(token, course, courseId));
			return navigate('/courses');
		}
	}

	useEffect(() => {
		setAuthorsList(() => {
			return removeCourseAuthors(course.authors, [...selectedAuthors]);
		});
	}, [selectedAuthors]);

	useEffect(() => {
		dispatch(getUserInfo(localStorage.getItem('token')));
		dispatch(getCourses());
		dispatch(getAuthors());
	}, []);

	return (
		<div className='course__form-box'>
			<form className='course__form' onSubmit={handleSubmit}>
				<div className='form__title-box'>
					<div>
						<Input
							className='form__input'
							label={INPUT_COURSE_TITLE_LABEL}
							labelText={INPUT_COURSE_TITLE_LABEL_TEXT}
							type={INPUT_TYPE_TEXT}
							placeHolderText={INPUT_COURSE_TITLE_PLHOLDER}
							value={course.title}
							onChange={handleChange}
							onBlur={onBlur}
						/>
						<Error text={isDirty.title && errors.title && errors.title} />
					</div>
					<Button
						view={BUTTON_TYPE_BUTTON}
						text={courseId ? BUTTON_UPDATE_COURSE : BUTTON_CREATE_COURSE}
						type={BUTTON_TYPE_SUBMIT}
					/>
				</div>
				<div className='form__descr-box'>
					<label htmlFor={INPUT_COURSE_DESCR_LABEL}>
						{INPUT_COURSE_DESCR_LABEL_TEXT}
					</label>
					<textarea
						className='form__descr'
						id={INPUT_COURSE_DESCR_LABEL}
						name={INPUT_COURSE_DESCR_LABEL}
						placeholder={INPUT_COURSE_DESCR_PLHOLDER}
						value={course.description}
						onChange={handleChange}
						onBlur={onBlur}
						rows='7'
						cols='128'
					></textarea>
					<Error
						text={
							isDirty.description && errors.description && errors.description
						}
					/>
				</div>
				<fieldset className='form__details'>
					<div className='form__details-box'>
						<h3 className='form__details-title'>Add author</h3>
						<Input
							className='form__input'
							label={INPUT_NAME_LABEL}
							type={INPUT_TYPE_TEXT}
							placeHolderText={INPUT_AUTHOR_NAME_PLHOLDER}
							value={authorName}
							onChange={updateAuthor}
						/>
						<Button
							classname='form__button'
							view={BUTTON_TYPE_BUTTON}
							text={BUTTON_CREATE_AUTHOR}
							type={BUTTON_TYPE_BUTTON}
							onClick={createAuthor}
						/>
					</div>
					<div className='form__details-box'>
						<h3 className='form__details-title'>Authors</h3>
						{authorsList.map((author) => {
							return (
								<div className='form__author-box' key={author.id}>
									<span>{author.name}</span>
									<Button
										classname='form__button'
										view={BUTTON_TYPE_BUTTON}
										text={BUTTON_ADD_AUTHOR}
										type={BUTTON_TYPE_BUTTON}
										onClick={() => handleAddAuthor(author.id)}
									/>
								</div>
							);
						})}
					</div>
					<div className='form__details-box'>
						<h3 className='form__details-title'>Duration</h3>
						<Input
							className='form__input'
							label={INPUT_COURSE_DURATION_LABEL}
							type={INPUT_TYPE_NUMBER}
							placeHolderText={INPUT_COURSE_DURATION_PLHOLDER}
							value={+course.duration}
							onChange={updateDuration}
							onBlur={onBlur}
						/>
						<Error
							text={isDirty.duration && errors.duration && errors.duration}
						/>
						<p className='form__course-duration'>
							Duration:{' '}
							<span className='form__course-duration-value'>
								{convertIntoHours(course.duration)}
							</span>{' '}
							hours
						</p>
					</div>
					<div className='form__details-box'>
						<h3 className='form__details-title'>Course authors</h3>
						{course.authors.length === 0 && (
							<p className='form__author-list'>Author list is empty</p>
						)}
						<Error text={isDirty.authors && errors.authors && errors.authors} />
						{getCourseAuthors(course.authors, selectedAuthors).map((author) => {
							return (
								<div className='form__author-box' key={author.id}>
									<span>{author.name}</span>
									<Button
										classname='form__button'
										view={BUTTON_TYPE_BUTTON}
										text={BUTTON_DELETE_AUTHOR}
										type={BUTTON_TYPE_BUTTON}
										onClick={() => handleDeleteAuthor(author)}
									/>
								</div>
							);
						})}
					</div>
				</fieldset>
			</form>
		</div>
	);
}

export default CourseForm;
