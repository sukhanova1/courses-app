import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '../Courses/components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import { selectCourses } from '../../store/courses/selectors';
import { selectAuthors } from '../../store/authors/selectors';
import { selectUserRole } from '../../store/users/selectors';
import { getCourses } from '../../store/courses/thunk';
import { getAuthors } from '../../store/authors/thunk';
import { getUserInfo } from '../../store/users/thunk';
import { getCourseAuthors } from '../../helpers/pipeAuthors';
import { BUTTON_ADD_COURSE, BUTTON_TYPE_BUTTON } from '../../constants';

import './Courses.css';

function Courses() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const courses = useSelector(selectCourses);
	const auhtorList = useSelector(selectAuthors);
	const isAdmin = useSelector(selectUserRole);

	const [searchValue, setSearchValue] = useState('');
	const [searchState, setSearchState] = useState(false);

	function showCourseCardsList(courseCardsList) {
		if (courseCardsList) {
			return courseCardsList.map((coursecard) => {
				const authors = getCourseAuthors(coursecard.authors, auhtorList);
				const authorsNames = authors.map((el) => el.name).join(', ');
				return (
					<CourseCard
						key={coursecard.id}
						course={coursecard}
						authors={authorsNames}
					/>
				);
			});
		}
	}

	function searchCourse() {
		if (courses) {
			const filteredCourses = courses.filter((course) => {
				return (
					course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
					course.id.toLowerCase().includes(searchValue.toLowerCase())
				);
			});
			return showCourseCardsList(filteredCourses);
		}
	}

	function handleInputChange(value) {
		setSearchValue(value);
		if (searchValue === '') {
			setSearchState(false);
		}
	}

	useEffect(() => {
		const isAuth = localStorage.getItem('token');
		if (isAuth) {
			dispatch(getUserInfo(isAuth));
		}
		dispatch(getCourses());
		dispatch(getAuthors());
	}, []);

	return (
		<div className='courses'>
			<div className='courses__bar'>
				<SearchBar
					value={searchValue}
					handleChange={handleInputChange}
					handleClick={() => setSearchState(true)}
				/>
				{isAdmin === 'admin' && (
					<Button
						view={BUTTON_TYPE_BUTTON}
						text={BUTTON_ADD_COURSE}
						type={BUTTON_TYPE_BUTTON}
						onClick={() => navigate('add')}
					/>
				)}
			</div>
			<div>
				{(!courses || courses.length === 0) && <p>There is no courses...</p>}
				{searchState ? searchCourse() : showCourseCardsList(courses)}
			</div>
		</div>
	);
}

export default Courses;
