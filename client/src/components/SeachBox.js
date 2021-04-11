import React, { useState } from "react";

function SeachBox({ history }) {
	const [searchTerm, setSearchTerm] = useState("");

	const submitHandler = e => {
		e.preventDefault();
		if (searchTerm.trim()) {
			history.push(`/search/${searchTerm}`);
		} else {
			history.push("/");
		}
	};

	return (
		<form className="form-inline" onSubmit={submitHandler}>
			<input
				className="form-control"
				type="text"
				value={searchTerm}
				onChange={e => setSearchTerm(e.currentTarget.value)}
				placeholder="Search products..."
			/>
			<button className="ml-2 btn btn-primary" type="submit">
				Search
			</button>
		</form>
	);
}

export default SeachBox;
