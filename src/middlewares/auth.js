const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");

	if (!token || token === "null")
		return res.status(401).json({ errorMessage: "Access denied. No token provided" });
	try {
		const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decodedUser;
		next();
	} catch (ex) {
		return res.status(400).json({ errorMessage: "Invalid auth token" });
	}
};
