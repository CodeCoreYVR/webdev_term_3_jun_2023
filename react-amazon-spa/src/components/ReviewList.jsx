import React from "react";
import ReviewDetails from "./ReviewDetails";

export default function ReviewList(props) {
	const { reviews, handleDeleteReview } = props;
	if (reviews.length <= 0)
		return <li className="list-group-item">No reviews ...yet</li>;

	return reviews.map((review, index) => (
		<ReviewDetails key={ index } { ...review } handleDeleteReview={ () => handleDeleteReview(review.id) } />
	));
}

