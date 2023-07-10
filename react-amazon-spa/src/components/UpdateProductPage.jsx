import React, { Component } from "react";
import { Product } from "../api/v1/productsApi";
import ProductForm from "./ProductForm"; // Assume you have a form component for products

export default class UpdateProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = { product: null };
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		Product.show(id).then(product => this.setState({ product }));
	}

	handleSubmit = params => {
		const { id } = this.props.match.params;
		Product.update(id, params).then(() => {
			this.props.history.push(`/products/${ id }`);
		});
	};

	render() {
		const { product } = this.state;

		if (!product) return <div>Loading...</div>;

		return (
      <div className="container mt-5">
        <ProductForm
          onSubmit={ this.handleSubmit }
          initialData={ product }
          buttonLabel="Update Product"
          title="Product Update"
        />
      </div>
		);
	}
}
