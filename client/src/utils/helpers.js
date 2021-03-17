import jwtDecode from "jwt-decode";
import InputGroup from "../components/InputGroup";

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

export function renderInputGroup(
	data,
	errors,
	label,
	type = "text",
	name,
	handleChange,
	required = false
) {
	return (
		<InputGroup
			label={label}
			type={type}
			name={name}
			value={data[name]}
			onChange={handleChange}
			required={required}
			error={errors[name]}
		/>
	);
}

export function decodeToken(token) {
	try {
		return jwtDecode(token);
	} catch (ex) {}
}

export function objectIsEmpty(object) {
	return Object.keys(object).length === 0;
}
