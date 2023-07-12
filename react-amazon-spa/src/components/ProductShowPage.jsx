import React, { useState, useEffect } from "react";
import { Product } from "../api/v1/productsApi";
import ProductDetails from "./ProductDetails";
import ReviewList from "./ReviewList";



const ProductShowPage = (props) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    Product.show(props.match.params.id).then((response) => {
      setProduct(response);
      setLoading(false);
    });
  }, [props.match.params.id]);

  // componentDidMount() {
  //   Product.show(this.props.match.params.id).then(response => {
  //     this.setState({
  //       product: response,
  //       loading: false
  //     })
  //   })
  // }

  const handleDeleteReview = reviewId => {
    setProduct(prevProduct => ({
      ...prevProduct,
      reviewers: prevProduct.reviewers.filter(review => review.id !== reviewId),
    }));
  }

  const handleDeleteProduct = productId => {
    Product.destroy(productId).then(response => {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        props.history.push("/products");
      }
    });
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">Product Show</h1>
      <div className="card border-light mx-auto ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
          <ProductDetails { ...product } handleDeleteProduct={ productId => handleDeleteProduct(productId) } />
          <div className="card-header bg-secondary text-white">
            <h3 className="card-title">Reviews:</h3>
          </div>
          <ul className="list-group">
            {product.reviewers.length > 0 ? (
              <ReviewList reviews={ product.reviewers } handleDeleteReview={ reviewId => handleDeleteReview(reviewId) } />
            ) : (
              <li className="list-group-item">No reviews ...yet!</li>
            )}
          </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductShowPage;
