import React from "react";

function Alert({ message }) {
	return (
		<div className="alert alert-secondary" role="alert">
			{message}
		</div>
	);
}

export default Alert;
