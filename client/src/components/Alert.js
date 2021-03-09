import React from "react";

function Alert({ message }) {
	return (
		<div class="alert alert-secondary" role="alert">
			{message}
		</div>
	);
}

export default Alert;
