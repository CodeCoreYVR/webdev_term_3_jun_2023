import React, { Component } from "react";
import { Product }  from "../api/v1/productsApi";
import NewProductForm from "./NewProductForm";

export default class NewProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.handleCreate = this.handleCreate.bind(this);
  };

  handleCreate(params) {
    Product.create(params).then(response => {
      if (response.errors) {
        this.setState({ errors: response.errors });
      } else {
        this.props.history.push(`/products/${response.id}`);
      }
    });
  };

  render() {
    return (
      <div className="container mt-5">
        <NewProductForm submitForm={ params => this.handleCreate(params) } errors={ this.state.errors } />
      </div>
    )
  }
}