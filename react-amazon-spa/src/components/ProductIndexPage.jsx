import { Component } from "react";
import { Product } from "../api/v1/productsApi";
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

    return (
			<div className="container mt-5">
				<div className="card border-light mx-auto ">
          <div className="card-header bg-secondary text-white">
            <h1 className="text-center">Product Index</h1>
          </div>
          <div className="card-body">
            <ol className="list-group list-group-flush">
              {this.state.loading ? (
                <li className="list-group-item">Loading...</li>
              ) : (
                <>              
                  {products && products.length > 0 ? (
                    <>
                      {products.map((product) => {
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
                  ) : (
                    <li className="list-group-item">No products ...yet!</li>
                  )}
                </>
              )}
            </ol>
          </div>
				</div>
			</div>
		)
	}
}
