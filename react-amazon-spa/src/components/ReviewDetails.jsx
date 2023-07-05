import React from "react";
import { StarRating } from './StarRating';

export default function ReviewDetails(props) {
	const { body, created_at, reviewer = {}, rating } = props;

  // const { reviewer = {} } = reviews;
  const { full_name } = reviewer;
	return (
		<div className="ReviewDetails">
			<li className="list-group-item">
        <div className="review-header">
          <StarRating rating={rating} max={5} />
          {/* <i>~ {new Date(created_at).toLocaleDateString()} ~</i> */}
          <i>~ <strong>{full_name}</strong> ~</i>
        </div>
        {/* <div>
          <strong>{full_name}:</strong>
        </div> */}
        <div>{body}</div>
      </li>
		</div>
	);
}

// export default ReviewDetails;
