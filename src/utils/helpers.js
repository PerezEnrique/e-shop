function prepareDataForClient(user) {
	return {
		_id: user._id,
		email: user.email,
		name: user.name,
		isAdmin: user.isAdmin,
	};
}

module.exports = { prepareDataForClient };
