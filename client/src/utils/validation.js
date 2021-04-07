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

export function validateLogIn(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});

	const errors = {};
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	return errors;
}

export function validateUserUpdate(userData) {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		name: Joi.string().required().label("Name"),
		password: Joi.string().label("Password"),
		confirmPassword: Joi.string().label("Confirm password"),
	});

	const errors = {};
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	if (userData.password && userData.confirmPassword !== userData.password) {
		errors["confirmPassword"] = "Passwords do not match";
	}

	return errors;
}

export function validateShippingData(userData) {
	const schema = Joi.object({
		address: Joi.string().required().label("Adress"),
		city: Joi.string().required().label("City"),
		postalCode: Joi.string().required().label("Postal code"),
		country: Joi.string().required().label("Country"),
	});

	const errors = {};
	const { error } = schema.validate(userData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	return errors;
}

export function validateProductData(productData) {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		brand: Joi.string().required().label("Brand"),
		image: Joi.object().required().label("Image"),
		price: Joi.number().required().min(0).label("Price"),
		description: Joi.string().required().label("Description"),
		countInStock: Joi.number().required().min(0).label("Count in stock"),
	});

	const errors = {};
	const { error } = schema.validate(productData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	return errors;
}

export function validateProductUpdate(productData) {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		brand: Joi.string().required().label("Brand"),
		image: Joi.object().label("Image"),
		price: Joi.number().required().min(0).label("Price"),
		description: Joi.string().required().label("Description"),
		countInStock: Joi.number().required().min(0).label("Count in stock"),
	});

	const errors = {};
	const { error } = schema.validate(productData, { abortEarly: false });
	if (error) {
		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}
	}

	return errors;
}
