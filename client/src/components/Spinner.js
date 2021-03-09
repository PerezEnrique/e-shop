import React from "react";

function Spinner() {
	return (
		<div class="d-flex justify-content-center">
			<div class="spinner-grow mt-5" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Spinner;
