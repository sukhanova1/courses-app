import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import './App.css';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						exact
						path='/'
						element={
							localStorage.getItem('token') ? (
								<Navigate to='/courses' />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route exact path='/courses' element={<Courses />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />

					<Route exact path='/courses' element={<PrivateRoute />}>
						<Route path='add' element={<CourseForm />} />
						<Route path='update/:courseId' element={<CourseForm />} />
					</Route>
					<Route path='*' element={<div>Page not found!!!</div>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
