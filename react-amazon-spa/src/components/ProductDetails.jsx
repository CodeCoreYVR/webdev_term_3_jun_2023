import React from "react";

function ProductDetails(props) {
	const {
		title,
		description,
		price,
		created_at,
		seller = {},
	} = props;
	const { full_name } = seller;
	return (
		<div className="ProductDetails">
			<h1>{title}</h1>
			<p>{description}</p>
			<p>Price: ${price}</p>
			<p>By: {full_name}</p>
			<p>Created at: {new Date(created_at).toLocaleDateString()}</p>
		</div>
	);
}

export default ProductDetails;
