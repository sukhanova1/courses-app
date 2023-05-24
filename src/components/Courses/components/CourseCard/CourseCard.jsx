import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { selectToken, selectUserRole } from '../../../../store/users/selectors';
import { convertIntoHours } from '../../../../helpers/pipeDuration';
import { deleteCourse } from '../../../../store/courses/thunk';
import {
	BUTTON_TITLE_EDIT,
	BUTTON_TYPE_BUTTON,
	BUTTON_TYPE_DELETE_ICON,
	BUTTON_TYPE_EDIT_ICON,
	BUTTON_TITLE_DELETE,
} from '../../../../constants';

import editIcon from '../../../../common/Button/assets/edit-icon.png';
import deleteIcon from '../../../../common/Button/assets/delete-icon.png';
import './CourseCard.css';

function CourseCard({ course, authors }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAdmin = useSelector(selectUserRole);
	const token = useSelector(selectToken);

	const handleEditCourse = () => {
		navigate(`update/${course.id}`);
	};

	const handleDeleteCourse = () => dispatch(deleteCourse(token, course.id));

	return (
		<div className='course-card'>
			<div className='course-card__content'>
				<h2 className='course-card__title'>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className='course-card__info-box'>
				<p className='course-card__authors'>
					<span className='course-card__info'>Authors: </span>
					{authors}
				</p>
				<p>
					<span className='course-card__info'>Duration: </span>
					{convertIntoHours(course.duration)} hours
				</p>
				<p>
					<span className='course-card__info'>Created: </span>
					{course.creationDate}
				</p>
				<div className='course-card__button-box'>
					<Link to={course.id} className='course-card__link'>
						Show course
					</Link>
					{isAdmin === 'admin' && (
						<div className='course-card__btns'>
							<Button
								view={BUTTON_TYPE_EDIT_ICON}
								type={BUTTON_TYPE_BUTTON}
								title={BUTTON_TITLE_EDIT}
								src={editIcon}
								onClick={handleEditCourse}
							/>

							<Button
								view={BUTTON_TYPE_DELETE_ICON}
								type={BUTTON_TYPE_BUTTON}
								title={BUTTON_TITLE_DELETE}
								src={deleteIcon}
								onClick={handleDeleteCourse}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
