import Joi from "joi-browser";

export function validateSignUp(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		name: Joi.string().required().label("Name"),
		password: Joi.string().required().label("Password"),
		confirmPassword: Joi.string().required().label("Confirm password"),
	});

	const errors = {};
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	if (userData.confirmPassword !== userData.password) {
		errors["confirmPassword"] = "Passwords do not match";
	}

	return errors;
}
