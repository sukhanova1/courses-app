export function convertIntoHours(number) {
	const hours = Math.floor(number / 60);
	let minutes = number % 60;

	return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
}
