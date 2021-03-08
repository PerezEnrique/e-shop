import axios from "axios";

axios.interceptors.response.use(null, ex => {
	const expectedError =
		ex.response && ex.response.status >= 400 && ex.response.status < 500;
	if (!expectedError) {
		console.log("Server error ocurred", ex.message && ex.message);
		return alert("Sorry. An unexpected error has ocurred");
	}
	return Promise.reject(ex);
});

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
