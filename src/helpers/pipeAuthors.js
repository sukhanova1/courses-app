export function getCourseAuthors(courseAuthors, authorsList) {
	return courseAuthors.flatMap((id) =>
		authorsList.filter((author) => author.id === id)
	);
}

export function removeCourseAuthors(coursAuthors, authorsList) {
	return authorsList
		.map((author) => {
			if (!coursAuthors.includes(author.id)) {
				return author;
			}
		})
		.filter((author) => author !== undefined);
}
