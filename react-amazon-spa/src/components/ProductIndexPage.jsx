import { Component } from "react";
// import productsData from "../tempDB/productsData";
import { Product } from "../api/v1/productsApi";
// import ProductDetails from "./ProductDetails";
// import ProductForm from "./ProductForm";
import { Link } from "react-router-dom";

export default class ProductIndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = { products: [], loading: true };

		this.handleDelete = this.handleDelete.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	componentDidMount() {
		Product.index().then((products) => {
			this.setState({ products: products, loading: false });
		});
	}

	handleDelete(productId) {
		Product.destroy(productId).then(() => {
			this.setState(prevState => ({
				products: prevState.products.filter(product => product.id !== productId),
			}));
		});
	}

	handleCreate(params) {
		console.log("createProduct invoked", params);
		this.setState(prevState => {
			const maxId = Math.max(...prevState.products.map((product) => product.id));
			return {
				products: [{ ...params, id: maxId + 1 }, ...prevState.products],
			};
		});
	}

	render() {
		let products = this.state.products;

		return products && products.length > 0 ? (
			<div className="container mt-5">
				{/* <NewProductForm submitForm={ params =>  this.handleCreate(params) } /> */}
				<h1 className="text-center">Product Index</h1>
				<div className="card border-light mx-auto ">
					{this.state.loading ? (
						<div>Loading...</div>
					) : (
						<>
							{products.map((product) => {
								// return <ProductDetails key={ product.id } { ...product } handleDelete={ () => this.handleDelete(product.id) } />;
								return (
									<li
										className="list-group-item d-flex justify-content-between align-items-center mb-1"
										key={ product.id }
									>
										<div>
											{ product.id } -{" "}
											<Link
												to={ `/products/${ product.id }` }
												className="no-underline"
											>
												{product.title}
											</Link>{" "}
										</div>
										<div>
											<button
												className="btn btn-secondary btn-sm"
												onClick={ () => this.handleDelete( product.id ) }
											>
												Delete
											</button>{" "}
										</div>
									</li>
								);
							})}
						</>
					)}
				</div>
			</div>
		) : (
			<div className="container mt-5">
				{/* <ProductForm submitForm={(params) => this.handleCreate(params)} /> */}
				<h1 className="text-center">Product Index</h1>
				<div className="card border-light mx-auto ">
					<div className="ProductDetails">
						<div className="card-header bg-secondary text-white">
							<h3 className="card-title">'No products ...yet!'</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
