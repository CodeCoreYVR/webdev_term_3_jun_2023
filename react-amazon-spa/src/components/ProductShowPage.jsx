import React, { Component } from "react";
import { Product } from "../api/v1/productsApi";
import ProductDetails from "./ProductDetails";
import ReviewList from "./ReviewList";



export default class ProductShowPage extends Component {
	// // product = productData();
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
    };
  }

  componentDidMount() {
    Product.show(this.props.match.params.id).then(response => {
      // console.log("pShow didMount 'response': ", response);
      this.setState({
        product: response,
        loading: false
      })
    })
  }

  handleDeleteReview(reviewId) {
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        reviewers: prevState.product.reviewers.filter((review) => review.id !== reviewId),
      },
    }));
  }

  handleDeleteProduct(productId) {
    Product.destroy(productId).then(response => {
      console.log("response: ", response, "response.errors: ", response.errors)
      if (response.errors) {
        this.setState({ errors: response.errors });
      } else {
        this.props.history.push("/products");
      }
    });
  }


	render() {
	  let product = this.state.product;
    // console.log("pShow didMount 'response': ", product.reviewer);

		return product.id ? (
			<div className="container mt-5">
				<h1 className="text-center">Product Show</h1>
				<div className="card border-light mx-auto ">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <>
            <ProductDetails {...product} />
            <div className="card-header bg-secondary text-white">
              <h3 className="card-title">Reviews:</h3>
            </div>
            <ul className="list-group">
              {product.reviewers.length > 0 ? (
                <ReviewList reviews={product.reviewers} handleDeleteReview={(reviewId) => this.handleDeleteReview(reviewId)} handleDeleteProduct={productId => this.handleDeleteProduct(productId)} />
              ) : (
                <li className="list-group-item">No reviews ...yet!</li>
              )}
            </ul>
            </>
          )}
				</div>
			</div>
		) : (
      <div>Loading...</div>
    );
	}
}
