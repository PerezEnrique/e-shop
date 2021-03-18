import jwtDecode from "jwt-decode";

export function getStockOptions(count) {
	const options = [];

	if (count < 1) {
		return options;
	}

	for (let i = 1; i <= count; i++) {
		options.push(i);
	}

	return options;
}

export function decodeToken(token) {
	try {
		return jwtDecode(token);
	} catch (ex) {}
}

export function objectIsEmpty(object) {
	return Object.keys(object).length === 0;
}
