// ./src/components/ReviewList.jsx

import React from "react";
import ReviewDetails from "./ReviewDetails";

function ReviewList(props) {
	const { reviews } = props;
	if (reviews.length <= 0)
		return <li className="list-group-item">No reviews ...yet</li>;

	return reviews.map((review, index) => (
		<ReviewDetails key={index} {...review} />
	));
}

export default ReviewList;
