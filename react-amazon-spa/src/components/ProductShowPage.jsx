import React, { Component } from "react";
import productData from "../tempDB/productData";
import ProductDetails from "./ProductDetails";
import ReviewList from "./ReviewList";

class ProductShowPage extends Component {
	product = productData();

	render() {
		let product = this.product;

		if (!product) return <p>Loading...</p>;

		return (
			<div className="container mt-5">
				<h1 className="text-center">Product Show</h1>
				<div className="card border-light mx-auto ">
					<ProductDetails {...product} />
					<div class="card-header bg-secondary text-white">
						<h3 class="card-title">Reviews:</h3>
					</div>
					<ul class="list-group">
						{product.reviews.length > 0 && (
							<ReviewList reviews={product.reviews} />
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default ProductShowPage;
