const mongoose = require("mongoose");

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
		isAdming: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
