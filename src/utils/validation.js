const Joi = require("joi");

function validateSignUp(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		name: Joi.string().required(),
		password: Joi.string().required(),
	});

	return schema.validate(userData, { abortEarly: false });
}

function validateLogIn(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	return schema.validate(userData, { abortEarly: false });
}

module.exports = { validateSignUp, validateLogIn };
