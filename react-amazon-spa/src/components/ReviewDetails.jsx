import React from "react";
import { StarRating } from './StarRating';

export default function ReviewDetails(props) {
	const { body, created_at, full_name, rating } = props;

	return (
		<div className="ReviewDetails">
			<li class="list-group-item">
        <p className="review-header">
          <StarRating rating={rating} max={5} />
          <i>~ {new Date(created_at).toLocaleDateString()} ~</i>
        </p>
        <div>
          <strong>{full_name}:</strong>
        </div>
        <div>{body}</div>
      </li>
		</div>
	);
}

// export default ReviewDetails;
