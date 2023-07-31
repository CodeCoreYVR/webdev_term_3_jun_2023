import React, { useState, useEffect } from "react";
import { Product } from "../api/v1/productsApi";
import { Review } from "../api/v1/reviewsApi";
import ProductDetails from "./ProductDetails";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";



const ProductShowPage = (props) => {
  const [product, setProduct] = useState({});
  const [newReview, setNewReview] = useState({
    body: "",
    rating: "",
  });
  const [editReviewId, setEditReviewId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    Product.show(props.match.params.id).then((response) => {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        setProduct(response);
        setLoading(false);
      }
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
    Review.destroy(product.id, reviewId).then(response => {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        setProduct(prevProduct => ({
          ...prevProduct,
          reviewers: prevProduct.reviewers.filter(review => review.id !== reviewId),
        }));
      }
    });
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

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  const handleReviewSubmit = review => {
    if (editReviewId === null) {
      Review.create(product.id, review).then(response => {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setProduct(prevProduct => ({
            ...prevProduct,
            reviewers: [response, ...prevProduct.reviewers]
          }));
          setNewReview({
            body: "",
            rating: "",
          });
          setLoading(false);
        }
      });
    } else {
      Review.update(product.id, editReviewId, review).then(response => {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setProduct(prevProduct => ({
            ...prevProduct,
            reviewers: prevProduct.reviewers.map(review => review.id === editReviewId ? response : review)
          }));
          setNewReview({
            body: "",
            rating: "",
          });
          setEditReviewId(null);
          setLoading(false);
        }
      })
    }
  }

  const handleEditReview = review => {
    setNewReview({
      body: review.body,
      rating: review.rating,
    });
    setEditReviewId(review.id);
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">Product Show</h1>
      <div className="card border-light mx-auto ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
          <ProductDetails 
            { ...product } 
            handleDeleteProduct={ productId => handleDeleteProduct(productId) } 
            currentUser={ currentUser }
          />
          <ReviewForm 
            onSubmit={ handleReviewSubmit } 
            onChange={ handleInputChange } 
            review={ newReview }
            buttonLabel={ editReviewId !== null ? "Update" : "Create" } 
            errors={ errors }
          />
          <div className="card-header bg-secondary text-white">
            <h3 className="card-title">Reviews:</h3>
          </div>
          <ul className="list-group">
            {product.reviewers.length > 0 ? (
              <ReviewList 
                reviews={ product.reviewers } 
                handleDeleteReview={ reviewId => handleDeleteReview(reviewId) } 
                handleEditReview={ reviewId => handleEditReview(reviewId) }
                currentUser={ currentUser }
              />
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
