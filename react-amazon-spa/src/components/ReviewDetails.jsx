import React from "react";

function ReviewDetails(props) {
	const { body, created_at, full_name } = props;

	return (
		<div className="ReviewDetails">
			<p>
				<strong>{full_name}:</strong>
			</p>
			<p>{body}</p>
			<p>Created at: {new Date(created_at).toLocaleDateString()}</p>
		</div>
	);
}

export default ReviewDetails;
