const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateSignUp, validateLogIn } = require("../utils/validation");
const prepareDataForClient = require("../utils/helpers").prepareDataForClient;

//route: POST /user/sign-up
//access: public
//desc: saves user in db
async function saveUser(req, res) {
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
	const savedUser = await newUser.save();
	const token = savedUser.generateAuthToken();
	const dataForClient = prepareDataForClient(savedUser);
	return res
		.status(201)
		.header("x-auth-token", token)
		.header("access-control-expose-header", "x-auth-token")
		.json({ success: true, data: dataForClient });
}

//route: POST /user/log-in
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

//route: GET /user
//access: private
//desc: returns user profile
async function getUserProfile(req, res) {
	const user = await User.findById(req.user._id).select("-password");
	if (!user)
		return res
			.status(404)
			.json({ success: false, errorMessage: "Couldn't find user with the provided id" });

	const dataForClient = prepareDataForClient(user);
	return res.status(200).json({ success: true, data: dataForClient });
}

module.exports = { saveUser, authenticateUser, getUserProfile };
