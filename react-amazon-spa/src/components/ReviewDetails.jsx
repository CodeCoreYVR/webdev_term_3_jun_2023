import React from "react";

function ReviewDetails(props) {
	const { body, created_at, full_name } = props;

	return (
		<div className="ReviewDetails">
			<li class="list-group-item">
        <p>
          <strong>{full_name}:</strong>
        </p>
        <p>{body}</p>
        <p><i>~ {new Date(created_at).toLocaleDateString()} ~</i></p>  
      </li>
		</div>
	);
}

export default ReviewDetails;
