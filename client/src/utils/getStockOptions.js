function getStockOptions(count) {
	const options = [];

	if (count < 1) {
		return options;
	}

	for (let i = 1; i <= count; i++) {
		options.push(i);
	}

	return options;
}

export default getStockOptions;
