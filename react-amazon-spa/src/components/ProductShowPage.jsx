import { Component } from "react";
import productData from "../tempDB/productData";
import ProductDetails from "./ProductDetails";
import ReviewList from "./ReviewList";


export default class ProductShowPage extends Component {
	// // product = productData();
  constructor(props) {
    super(props);
    this.state = {
      product: productData(),
    };
  }

  handleDeleteReview(reviewId) {
    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        reviews: prevState.product.reviews.filter((review) => review.id !== reviewId),
      },
    }));
  }


	render() {
	  let product = this.state.product;

		return product.id ? (
			<div className="container mt-5">
				<h1 className="text-center">Product Show</h1>
				<div className="card border-light mx-auto ">
					<ProductDetails {...product} />
					<div className="card-header bg-secondary text-white">
						<h3 className="card-title">Reviews:</h3>
					</div>
					<ul className="list-group">
						{product.reviews.length > 0 ? (
							<ReviewList reviews={product.reviews} handleDelete={(reviewId) => this.handleDeleteReview(reviewId)} />
						) : (
              <li className="list-group-item">No reviews ...yet!</li>
            )}
					</ul>
				</div>
			</div>
		) : (
      <div>Loading...</div>
    );
	}
}
