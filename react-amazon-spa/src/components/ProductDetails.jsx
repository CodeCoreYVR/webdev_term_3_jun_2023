import React from "react";

export default function ProductDetails(props) {
	const {
		title,
		description,
		price,
		created_at,
		seller = {},
	} = props;
	const { full_name } = seller;

  
	return (
		<div className="ProductDetails">
			<div className="card-header bg-secondary text-white">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        {created_at ? (
          <div>
            <p className="card-text"><i>~ {new Date(created_at).toLocaleDateString()} ~</i></p>
          </div>
        ) : (
          null
        )}
        {/* <div>
          <p className="card-text"><i>~ {new Date(created_at).toLocaleDateString()} ~</i></p>
        </div> */}
        <div>
          <h3>Created By:</h3>
          <p className="card-text">{full_name}</p>
        </div>
        <hr></hr>
        <div>
          <h3>Description:</h3>
          <p className="card-text">{description}</p>
        </div>
        <hr></hr>
        <div>
          <h3>Price:</h3>
          <p className="card-text">${price}</p>
        </div>
        <div>
          <button onClick={props.handleDelete}>Delete</button>
        </div>
      </div>
		</div>
	);
}

// export default ProductDetails;
