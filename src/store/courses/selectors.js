export const selectCourses = (state) => state.courses;

export const selectCourse = (id) => (state) =>
	state.courses.filter((course) => course.id === id)[0];
