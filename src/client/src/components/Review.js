import React from "react";
import Rating from "./Rating";

function Review({ review: { user, rating, comment, createdAt } }) {
	return (
		<div className="card">
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<h4 className="card-title h5 mb-0">{user.name}</h4>
					<p className="mb-1 text-muted">{createdAt.substring(0, 10)}</p>
				</div>
				<Rating value={rating} />
				<p>{comment}</p>
			</div>
		</div>
	);
}

export default Review;
