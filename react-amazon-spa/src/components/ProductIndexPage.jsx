import React, { Component } from "react";
import productsData from "../tempDB/productsData";
import ProductDetails from "./ProductDetails";

export default class ProductIndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: productsData,
		}
    this.handleDelete = this.handleDelete.bind(this);
	}

  handleDelete(productId) {
    this.setState((prevState) => ({
      products: prevState.products.filter((product) => product.id !== productId),
    }));
  }


	render() {
		let products = this.state.products;
		return products && products.length > 0 ? (
			<div className="container mt-5">
				<h1 className="text-center">Product Index</h1>
				<div className="card border-light mx-auto ">
					{products.map((product) => {
						return <ProductDetails key={product.id} {...product} handleDelete={() => this.handleDelete(product.id)} />;
					})}
				</div>
			</div>
		) : (
			<div>Loading Products Index Page...</div>
		);
	}
}
