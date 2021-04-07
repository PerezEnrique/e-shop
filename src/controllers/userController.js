const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
	validateSignUp,
	validateLogIn,
	validateUserUpdate,
	validateStatusValue,
} = require("../utils/validation");
const prepareDataForClient = require("../utils/helpers").prepareDataForClient;

//route: POST /users/sign-up
//access: public
//desc: creates new user
async function createUser(req, res) {
	const { email, name, password } = req.body;
	const validationError = validateSignUp(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists)
		return res.status(400).json({
			success: false,
			errorMessage: "An user with the provided email already exists",
		});

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ email, name, password: hashedPassword });
	const createdUser = await newUser.save();
	const token = createdUser.generateAuthToken();
	const dataForClient = prepareDataForClient(createdUser);
	return res
		.status(201)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

//route: POST /users/log-in
//access: public
//desc: logs user in
async function authenticateUser(req, res) {
	const { email, password } = req.body;
	const validationError = validateLogIn(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const user = await User.findOne({ email });
	if (!user)
		return res
			.status(400)
			.json({ success: false, errorMessage: "Invalid email or password" });

	const passwordDidMatch = await bcrypt.compare(password, user.password);
	if (!passwordDidMatch)
		return res
			.status(400)
			.json({ success: false, errorMessage: "Invalid email or password" });

	const token = user.generateAuthToken();
	const dataForClient = prepareDataForClient(user);
	return res
		.status(200)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

//route: PUT /users
//access: private
//desc: update user's profile
async function updateUserProfile(req, res) {
	const { email, name, password } = req.body;
	const validationError = validateUserUpdate(req.body);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const user = await User.findById(req.user._id);
	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });

	user.email = email;
	user.name = name;
	if (password) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		user.password = hashedPassword;
	}

	const updatedUser = await user.save();
	const token = updatedUser.generateAuthToken();
	const dataForClient = prepareDataForClient(updatedUser);
	return res
		.status(201)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

//route: GET /users
//access: private (and only for admins)
//desc: returns all user
async function getUsers(req, res) {
	const users = await User.find({}).select("-password");
	return res.status(200).json({ success: true, data: users });
}

//route: GET /users/:id
//access: private (and only for admins)
//desc: returns a single user
async function getUser(req, res) {
	const user = await User.findById(req.params.id).select("-password");
	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });
	return res.status(200).json({ success: true, data: user });
}

//route: PUT /users/:id/edit-status
//access: private (and only for admins)
//desc: edit other user's admin status
async function editAdminStatus(req, res) {
	const { isAdmin } = req.body;
	const validationError = validateStatusValue(isAdmin);
	if (validationError)
		return res.status(400).json({ success: false, errorMessage: validationError });

	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ isAdmin },
		{ new: true, useFindAndModify: false }
	).select("-password");

	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });

	return res.status(201).json({ success: true, data: user });
}

module.exports = {
	createUser,
	authenticateUser,
	updateUserProfile,
	getUsers,
	getUser,
	editAdminStatus,
};
