import React from "react";
import { Link } from "react-router-dom";

export default function ProductDetails(props) {
	const { id, title, description, price, created_at, seller = {} } = props;
	const { full_name } = seller;

	return (
		<>
			<div className="card-header bg-secondary text-white">
        <h3 className="card-title">{ title }</h3>
      </div>
      <div className="card-body">
        {created_at ? (
          <div>
            <p className="card-text"><i>~ { new Date(created_at).toLocaleDateString() } ~</i></p>
          </div>
        ) : (
          null
        )}
        <div>
          <h3>Created By:</h3>
          <p className="card-text">{ full_name }</p>
        </div>
        <hr></hr>
        <div>
          <h3>Description:</h3>
          <p className="card-text">{ description }</p>
        </div>
        <hr></hr>
        <div>
          <h3>Price:</h3>
          <p className="card-text">${ price }</p>
        </div>
        <div className="d-flex justify-content-around align-items-center mb-1">
          <button className="btn btn-secondary mt-2" onClick={ () => props.handleDeleteProduct(id) }>Delete</button>
          <Link to={`/products/${ id }/edit`} className="btn btn-secondary mt-2">Edit Product</Link>
        </div>
      </div>
		</>
	);
}
