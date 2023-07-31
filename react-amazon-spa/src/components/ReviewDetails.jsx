import React, { useEffect } from "react";
import { StarRating } from './StarRating';

export default function ReviewDetails(props) {
	const { user_id, body, full_name, rating, handleDeleteReview, handleEditReview, currentUser } = props;

  
  return (
		<div className="ReviewDetails">
			<li className="list-group-item">
        <div className="review-header">
          <StarRating rating={ rating } max={5} />
          <i>~ <strong>{ full_name }</strong> ~</i>
        </div>
        <div>{ body }</div>
        {currentUser.id === user_id ? (
          <div className="d-flex gap-2 mt-3 mb-2">
            <button className="btn btn-secondary btn-sm" onClick={ handleEditReview }>Edit</button>
            <button className="btn btn-secondary btn-sm" onClick={ handleDeleteReview }>Delete</button>
          </div>
        ) : (
          null
        )}
      </li>
		</div>
	);
}

