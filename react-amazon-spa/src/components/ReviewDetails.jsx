import React from "react";
import { StarRating } from './StarRating';

export default function ReviewDetails(props) {
	const { body, reviewer = {}, rating } = props;
  const { full_name } = reviewer;
	
  return (
		<div className="ReviewDetails">
			<li className="list-group-item">
        <div className="review-header">
          <StarRating rating={ rating } max={5} />
          <i>~ <strong>{ full_name }</strong> ~</i>
        </div>
        <div>{ body }</div>
        <div>
          <button onClick={ props.handleDelete }>Delete Review</button>
        </div>
      </li>
		</div>
	);
}

