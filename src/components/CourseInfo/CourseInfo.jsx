import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectAuthors } from '../../store/authors/selectors';
import { selectCourse } from '../../store/courses/selectors';
import { selectUserIsAuth } from '../../store/users/selectors';
import { getUserInfo } from '../../store/users/thunk';
import { getCourses } from '../../store/courses/thunk';
import { getAuthors } from '../../store/authors/thunk';
import { convertIntoHours } from '../../helpers/pipeDuration';
import { getCourseAuthors } from '../../helpers/pipeAuthors';
import { DATE_ICON_ALT, TIME_ICON_ALT } from '../../constants';

import dateIcon from './assets/date-icon.png';
import timeIcon from './assets/time-icon.png';
import './CourseInfo.css';

function CourseInfo() {
	const dispatch = useDispatch();
	const { courseId } = useParams();

	const isAuth = useSelector(selectUserIsAuth);
	const course = useSelector(selectCourse(courseId));
	const allAuthorsList = useSelector(selectAuthors);

	useEffect(() => {
		if (!isAuth) {
			dispatch(getUserInfo(localStorage.getItem('token')));
			dispatch(getCourses());
			dispatch(getAuthors());
		}
	}, []);

	return (
		<div className='course-info__box'>
			<div className='course-info'>
				<Link to='/courses' className='course-info__link'>
					&#60; Back to courses
				</Link>
				<h1 className='course-info__title'>{course && course.title}</h1>
				<div className='course-info__container'>
					<div className='course-info__details-box'>
						<p>
							<span className='course-info__details-text'>Id: </span>
							{course && course.id}
						</p>
						<div className='course-info__authors'>
							<span className='course-info__details-text'>Authors: </span>{' '}
							<div className='course-info__authors-box'>
								{course &&
									allAuthorsList &&
									getCourseAuthors(course.authors, allAuthorsList).map(
										(author) => {
											return <p key={author.id}>{author.name}</p>;
										}
									)}
							</div>
						</div>
						<div className='course-info__details'>
							<span className='course-info__details-text'>Duration: </span>{' '}
							<img src={timeIcon} alt={TIME_ICON_ALT} width='25px' />
							{course && convertIntoHours(course.duration)} hours
						</div>
						<div className='course-info__details'>
							<span className='course-info__details-text'>Created: </span>
							<img src={dateIcon} alt={DATE_ICON_ALT} width='25px' />
							{course && course.creationDate}
						</div>
					</div>
					<div className='course-info__descr-box'>
						<h2 className='course-info__descr-title'>About course</h2>
						<p className='course-info__descr-text'>
							{course && course.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
