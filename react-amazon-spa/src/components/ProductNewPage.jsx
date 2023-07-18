import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../api/v1/productsApi";
import ProductForm from "./ProductForm";

const NewProductPage = props => {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { errors: [] };
	// 	this.handleCreate = this.handleCreate.bind(this);
	// }
  const history = useHistory();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState([]);

	const handleCreate = params => {
		Product.create(params).then(newProduct => {
			if (newProduct.errors) {
				setErrors(newProduct.errors);
			} else {
				history.push(`/products/${ newProduct.id }`);
			}
		})
    .catch(error => {
      console.error('Fetch Error:', error);
    });;
	}

  const handleInputChange = event => {
    setProduct({
      ...product,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }


  return (
    <div className="container mt-5">
      <ProductForm
        onSubmit={ () => handleCreate(product) }
        onChange={ handleInputChange }
        product={ product }
        buttonLabel="Create"
        title="New Product"
        errors={ errors }
      />
    </div>
  );
}

export default NewProductPage;
