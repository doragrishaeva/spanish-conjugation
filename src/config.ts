const API_URL =
	process.env.NODE_ENV === 'production'
		? 'https://spanish-conjugation-nzlu.onrender.com'
		: 'http://localhost:5000';

export default API_URL;
