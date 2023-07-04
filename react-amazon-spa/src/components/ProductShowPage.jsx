import React, { Component } from "react";
import productData from "../tempDB/productData";
import ProductDetails from "./ProductDetails";

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
				</div>
			</div>
		);
	}
}

export default ProductShowPage;
