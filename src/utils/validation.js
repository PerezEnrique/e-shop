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

function validateUserUpdate(userData) {
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

function validateProductData(productData) {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		brand: Joi.string().required().label("Brand"),
		price: Joi.number().required().min(0).label("Price"),
		description: Joi.string().required().label("Description"),
		countInStock: Joi.number().required().min(0).label("Count in stock"),
	});

	let validationError = null;
	const { error } = schema.validate(productData, { abortEarly: false });
	if (error) {
		validationError = "";
		for (let item of error.details) {
			validationError += ` ${item.message}.`;
		}
	}
	return validationError;
}

function validateReview(review) {
	const schema = Joi.object({
		rating: Joi.number().required().min(0).max(5).label("Rating"),
		comment: Joi.string().required().label("Comment"),
	});

	let validationError = null;
	const { error } = schema.validate(review, { abortEarly: false });
	if (error) {
		validationError = "";
		for (let item of error.details) {
			validationError += ` ${item.message}.`;
		}
	}
	return validationError;
}

module.exports = {
	validateSignUp,
	validateLogIn,
	validateUserUpdate,
	validateStatusValue,
	validateProductData,
	validateReview,
};
