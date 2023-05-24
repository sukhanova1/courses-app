export function generateDate() {
	return new Date().toLocaleString('en-GB', { dateStyle: 'short' });
}
