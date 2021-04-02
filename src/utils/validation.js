const Joi = require("joi");

function validateSignUp(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		name: Joi.string().required().label("Name"),
		password: Joi.string().required().label("Password"),
	});

	let validationError = null;
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		validationError = "";
		for (let item of error.details) {
			validationError += ` ${item.message}.`;
		}
	}
	return validationError;
}

function validateLogIn(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	let validationError = null;
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		validationError = "";
		for (let item of error.details) {
			validationError += ` ${item.message}.`;
		}
	}
	return validationError;
}

function validateDataToUpdate(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		name: Joi.string().required().label("Name"),
		password: Joi.string().label("Password"),
	});

	let validationError = null;
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		validationError = "";
		for (let item of error.details) {
			validationError += ` ${item.message}.`;
		}
	}
	return validationError;
}

function validateStatusValue(userData) {
	const boolean = Joi.boolean();

	const { error } = boolean.validate(userData);
	return error;
}

module.exports = {
	validateSignUp,
	validateLogIn,
	validateDataToUpdate,
	validateStatusValue,
};
