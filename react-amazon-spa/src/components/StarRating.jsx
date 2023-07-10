import React from "react";
import { Star } from "./Star";

export function StarRating(props = {}) {
	const { max = 5, rating = 0 } = props;
	const stars = Array.apply(null, { length: max }).map((a, i) => i < rating);
	function style(bool) {
		return {
			color: bool ? "yellow" : "lightgrey",
			height: "20px",
		};
	}
	return (
		<div>
			{stars.map((bool, i) => {
				return <Star key={ i } style={ style(bool) } />;
			})}
		</div>
	);
}
