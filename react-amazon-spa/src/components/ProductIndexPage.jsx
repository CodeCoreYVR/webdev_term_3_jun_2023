import React, { Component } from "react";
import productsData from "../tempDB/productsData";
import ProductDetails from "./ProductDetails";

export default class ProductIndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: productsData,
		};
	}

	render() {
    let products = this.state.products;
		return (products && products.length > 0) ? (
			<div class="container mt-5">
        <h1 className="text-center">Product Index</h1>
				<div className="card border-light mx-auto ">
              {products.map((product) => {
                return <ProductDetails key={product.id} {...product} />;
              })}
        </div>
			</div>
		) : (
			<div>Loading Products Index Page...</div>
		);
	}
}
