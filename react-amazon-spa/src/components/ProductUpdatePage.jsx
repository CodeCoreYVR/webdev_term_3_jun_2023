import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../api/v1/productsApi";
import ProductForm from "./ProductForm";

const UpdateProductPage = props => {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { product: null };
	// }
  const history = useHistory();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = props.match.params;

	// componentDidMount() {
	// 	const { id } = this.props.match.params;
	// 	Product.show(id).then(product => this.setState({ product }));
	// }

  useEffect(() => {
    Product.show(id).then((response) => {
      setProduct(response);
      setLoading(false);
    });
  }, [id]);

	const handleSubmit = params => {
		Product.update(id, params).then(updatedProduct => {
      if (updatedProduct.errors) {
        setErrors(updatedProduct.errors);
      } else {
        history.push(`/products/${ updatedProduct.id }`);
      }
		});
	};

  const handleInputChange = event => {
    setProduct({
      ...product,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  
  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
          <ProductForm
            onSubmit={ handleSubmit }
            onChange={ handleInputChange }
            product={ product }
            buttonLabel="Update"
            title="Product Update"
            errors={ errors }
          />
      )}
    </div>
  );
}

export default UpdateProductPage;
