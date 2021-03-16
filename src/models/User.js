const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			unique: true,
		},
		name: { type: String, required: [true, "Name is required"] },
		password: { type: String, required: [true, "Password is required"], trim: true },
		isAdmin: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{ _id: this._id, name: this.name, isAdmin: this.isAdmin },
		process.env.JWT_PRIVATE_KEY,
		{ expiresIn: "7d" }
	);
};

module.exports = mongoose.model("User", UserSchema);
