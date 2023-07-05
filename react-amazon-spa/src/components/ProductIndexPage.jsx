import { Component } from "react";
import productsData from "../tempDB/productsData";
import ProductDetails from "./ProductDetails";
import NewProductForm from "./NewProductForm";

export default class ProductIndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: productsData,
		}
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
	}

  handleDelete(productId) {
    this.setState((prevState) => ({
      products: prevState.products.filter((product) => product.id !== productId),
    }));
  }

  handleCreate(params) {
    console.log('createProduct invoked', params);
    this.setState((prevState) => {
      return { products: [{ ...params, id: prevState.products[0] +1 }, ...prevState.products] }
    })
  }


	render() {
		let products = this.state.products;
		return products && products.length > 0 ? (
			<div className="container mt-5">
        <NewProductForm submitForm={ params =>  this.handleCreate(params) } />
				<h1 className="text-center">Product Index</h1>
				<div className="card border-light mx-auto ">
					{products.map(product => {
						return <ProductDetails key={ product.id } { ...product } handleDelete={ () => this.handleDelete(product.id) } />;
					})}
				</div>
			</div>
		) : (
			<div>Loading Products Index Page...</div>
		);
	}
}
