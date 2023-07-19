import React, { useState, useEffect } from "react";
import { Product } from "../api/v1/productsApi";
import { Link } from "react-router-dom";

const ProductIndexPage = ({ currentUser }) => {
	const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Product.index().then(products => {
      setProducts(products);
      setLoading(false);
    })
  }, []);

	const handleDelete = productId => {
		Product.destroy(productId).then(() => {
			setProducts(prevProducts => {
        return prevProducts.filter(product => product.id !== productId);
      });
		});
	}


  return (
    <div className="container mt-5">
      <div className="card border-light mx-auto ">
        <div className="card-header bg-secondary text-white">
          <h1 className="text-center">Product Index</h1>
        </div>
        <div className="card-body">
          <ol className="list-group list-group-flush">
            {loading ? (
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
                              { product.title }
                            </Link>{" "}
                          </div>
                          {currentUser.id === product.user_id ? (
                            <div>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={ () => handleDelete(product.id) }
                              >
                                Delete
                              </button>{" "}
                            </div>
                          ) : (
                            null
                          )}
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

export default ProductIndexPage;