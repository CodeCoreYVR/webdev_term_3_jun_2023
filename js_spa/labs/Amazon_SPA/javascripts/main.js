// Base URL for our API
const DOMAIN = 'localhost:3000';
const API_PREFIX = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;



// AJAX helpers related to Products
const Product = {
  // GET /api/v1/products
  index() {
		return fetch(`${BASE_URL}/products`)
			.then(res => res.json())
			.catch(console.error);
	},
  // GET /api/v1/products/:id
	show(id) {
		return fetch(`${BASE_URL}/products/${id}`)
			.then(res => res.json())
			.catch(console.error);
	},
  // POST /api/v1/products
  create(params) {
    const productParams = {};
    for (let [key, value] of params.entries()) {
      productParams[key] = value;
    }
    // const token = window.localStorage.getItem('userToken');
    return fetch(`${BASE_URL}/products`, {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ product: productParams }),
    })
    .then(res => res.json())
    .catch(console.error);
  }
};

// Session helper
const Session = {
  create() {
    const email = 'admin@user.ca';
    const password = 'password';
    return fetch (`${BASE_URL}/session`, {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
  }
}


// --UTILITY FUNCTIONS--
const qS = (selector, node = document) => {
	return node.querySelector(selector);
}
const qSA = (selector, node = document) => { // for multiple elements if needed later
	return node.querySelectorAll(selector);
}
const byId = (id) => {
	return document.getElementById(id);
}

// --Create DOM Element helpers--
const createElement = (tagName, attributes = {}) => {
	const element = document.createElement(tagName);
	for (let attribute in attributes) {
		element.setAttribute(attribute, attributes[attribute]);
	}
	return element;
}

// --Toggle display none helper--
const toggleDisplayNone = (element) => {
  let elements = qSA('.page')

  elements.forEach(el => {
    el.style.display = 'none';
  });

  element.style.display = 'block';

};

// --RENDERING FUNCTIONS--
// Render all products
const renderProducts = (products = []) => {
	// find out product-index div
	const productIndexDiv = byId('product-index');
	// clear the product index div
	productIndexDiv.innerHTML = '';

  // I have tabbed the code below to make it easier to read as if it were in HTML.
  // So the first line is the parent div, the second line is the child div, the third line is the child h1, etc.
  // For the record this is NOT proper tabbing convention for JS or even specifically querySelector.
    const productH1Div = createElement('div', { class: 'card-header bg-secondary text-white' });
      const productH1 = createElement('h1', { class: 'card-title text-center' });
      productH1.innerText = 'Products Index';
    productH1Div.append(productH1);

    const productOrderedListDiv = createElement('div');
      const productOrderedList = createElement('ol', { class: 'list-group list-group-flush' });
        // for each product in our products data that came from the API
        products.forEach((product, index) => {
          // create a list item and a link inside of the ordered list
          const productListItem = createElement('li', { class: 'list-group-item' });
              const titleLink = createElement('a', {
                ['data-id']: product.id,
                class: 'no-underline',
                href: '',
                title: product.description
              });
          
              titleLink.innerText = `${index + 1}. ${product.title}`;
            productListItem.append(titleLink);
          productOrderedList.append(productListItem);
        });
    productOrderedListDiv.append(productOrderedList);

  productIndexDiv.append(productH1Div, productOrderedListDiv);

  // Below is removed as now that we have a nav bar, we don't need a back button
  // Add event listener for back button
  // qS("#back-button").addEventListener('click', (event) => {
    
    // toggleDisplayNone(qS('#product-index'));
  // });
}

// Refresher function to refresh products
const refreshProducts = () => {
	Product.index().then(products => {
		renderProducts(products);
		// The code below is vulnerable to code/script injection!
		// byId('product-index').innerHTML = `${products
		// 	.map(
		// 		product => `<div class="product-listing">
		//         <a href title=${product.description} data-id=${product.id}>${
		// 			product.title
		// 		}</a>
		//     </div>`
		// 	)
		// 	.join('')}`;
	});
}

// Render a single product
const renderProduct = (product = {}) => {
	const productShow = byId('product-show');
  productShow.innerHTML = '';

    const productH1 = createElement('h1', { class: 'text-center' });
    productH1.innerText = 'Product Show';

    // I have tabbed the code below to make it easier to read as if it were in HTML.
    // So the first line is the parent div, the second line is the child div, the third line is the child h1, etc.
    // For the record this is NOT proper tabbing convention for JS or even specifically querySelector.
    const productDiv = createElement('div', { class: 'card border-light mx-auto' });
      const productTitleDiv = createElement('div', { class: 'card-header bg-secondary text-white' });
        const productTitleH3 = createElement('h3', { class: 'card-title' });
        productTitleH3.innerText = product.title;
      productTitleDiv.append(productTitleH3);

      const productBodyDiv = createElement('div', { class: 'card-body' });
        const productDescriptionDiv = createElement('div');
          const productDescriptionH3 = createElement('h3', { class: 'black-text' });
          productDescriptionH3.innerText = 'Description:';
          const productDescriptionP = createElement('p', { class: 'card-text black-text' });
          productDescriptionP.innerText = product.description;
        productDescriptionDiv.append(productDescriptionH3, productDescriptionP);

        const productPriceDiv = createElement('div');
          const productPriceH3 = createElement('h3', { class: 'black-text' });
          productPriceH3.innerText = 'Price:';
          const productPriceP = createElement('p', { class: 'card-text black-text' });
          productPriceP.innerText = `$${product.price}`;
        productPriceDiv.append(productPriceH3, productPriceP);

        const productHR = createElement('hr');

      productBodyDiv.append(productDescriptionDiv, productHR, productPriceDiv);

    productDiv.append(productTitleDiv, productBodyDiv);

    const reviewsHeaderDiv = createElement('div', { class: 'card-header bg-secondary text-white' });
      const ReviewH3 = createElement('h3', { class: 'card-title' });
      ReviewH3.innerText = 'Reviews:';
    reviewsHeaderDiv.append(ReviewH3);

  productShow.append(productH1, productDiv, reviewsHeaderDiv, renderReviews(product.reviews));
  
  toggleDisplayNone(productShow);
}

// ----- Stretch -----
// Render all reviews
const renderReviews = (reviews = []) => {
	const reviewsUL = createElement('ul', { class: 'list-group' });
    reviews.forEach(review => {
        // I have tabbed the code below to make it easier to read as if it were in HTML.
        // So the first line is the parent div, the second line is the child div, the third line is the child h1, etc.
        // For the record this is NOT proper tabbing convention for JS or even specifically querySelector.
        const reviewLI = createElement('li', { class: 'list-group-item black-text' });
          const reviewRatingP = createElement('p');
          reviewRatingP.innerText = `${review.rating}/5`;
          const reviewBodyP = createElement('p');
          reviewBodyP.innerText = review.body;
        reviewLI.append(reviewRatingP, reviewBodyP);
      reviewsUL.append(reviewLI);
    });

  return reviewsUL;
}

// Create a product
const renderProductCreate = () => {
  // console.log("start of renderProductCreate")
  const productNew = byId('product-new');
  productNew.innerHTML = '';
  productNew.style.display = 'none';

    // I have tabbed the code below to make it easier to read as if it were in HTML.
    // So the first line is the parent div, the second line is the child div, the third line is the child h1, etc.
    // For the record this is NOT proper tabbing convention for JS or even specifically querySelector.
    const productDiv = createElement('div', { class: 'card border-light mx-auto' });
      const productHeaderDiv = createElement('div', { class: 'card-header bg-secondary text-white' });
        const productHeaderH1 = createElement('h1', { class: 'card-title text-center' });
        productHeaderH1.innerText = 'Create a Product';
      productHeaderDiv.append(productHeaderH1);

      const productBodyDiv = createElement('div', { class: 'card-body' });
        const productForm = createElement('form');
          const productTitleDiv = createElement('div', { class: 'form-group' });
            const productTitleLabel = createElement('label', { for: 'title' });
            productTitleLabel.innerText = 'Title:';
            const productTitleInput = createElement('input', { type: 'text', class: 'form-control', id: 'title', name: 'title' });
            productTitleInput.setAttribute('placeholder', 'Enter title');
          productTitleDiv.append(productTitleLabel, productTitleInput);

          const productDescriptionDiv = createElement('div', { class: 'form-group' });
            const productDescriptionLabel = createElement('label', { for: 'description' });
            productDescriptionLabel.innerText = 'Description:';
            const productDescriptionInput = createElement('input', { type: 'text', class: 'form-control', id: 'description', name: 'description' });
            productDescriptionInput.setAttribute('placeholder', 'Enter description');
          productDescriptionDiv.append(productDescriptionLabel, productDescriptionInput);

          const productPriceDiv = createElement('div', { class: 'form-group' });
            const productPriceLabel = createElement('label', { for: 'price' });
            productPriceLabel.innerText = 'Price:';
            const productPriceInput = createElement('input', { type: 'number', class: 'form-control', id: 'price', name: 'price' });
          productPriceDiv.append(productPriceLabel, productPriceInput);

          const productSubmitDiv = createElement('div', { class: 'card-footer text-center' });
            const productSubmitButton = createElement('button', { type: 'submit', class: 'btn btn-secondary' });
            productSubmitButton.innerText = 'Submit';
          productSubmitDiv.append(productSubmitButton);

        productForm.append(productTitleDiv, productDescriptionDiv, productPriceDiv, productSubmitDiv);
      productBodyDiv.append(productForm);
    productDiv.append(productHeaderDiv, productBodyDiv);
  productNew.append(productDiv);

  // console.log("productNew: ", productNew)
  // toggleDisplayNone(productNew);
};

// Upon loading the DOM, refresh the products
document.addEventListener('DOMContentLoaded', function() {
  refreshProducts();

  // Creating a session automatically upon loading the DOM, obviously this is not secure and not normal, however,
  // I am doing this to make it easier to test the app and the lab does does not mention anything about creating sessions
  Session.create().then(data => {
    if (data && data.status) {
      // If sign-in was successful, save the token to local storage
      console.log("User signed in successfully.");
    } else {
      console.error('Failed to sign in automatically.');
    }
  })
  .catch(error => {
    console.error('There has been a problem with the sign-in operation:', error);
  });

  // Add event listener for product index
	byId('product-index').addEventListener('click', event => {
		event.preventDefault();
		const { target } = event;

    // if the target matches an anchor tag
		if (target.matches('a')) {
      // call the renderProduct function with the id of the product
			Product.show(target.dataset.id).then(product => renderProduct(product));
		}
	});

  // Add event listener for nav bar
  qS("nav").addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;

    // console.log("target.dataset.page: ", target.dataset.page)
    if (target.dataset.page) {
      toggleDisplayNone(byId(target.dataset.page));
    }
  });

  // Add event listener for new product form
  renderProductCreate(); // render the form on page load so it is ready to go when the user clicks the nav bar
  const newProductForm = qS("form", byId('product-new'));
  newProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    Product.create(formData)
      .then(product => {
        if (product.title) {
          refreshProducts(); // Refresh the products list
          renderProduct(product); // Render the product if creation was successful
        } else {
          toggleDisplayNone(byId('product-new')); // Render the form again if there was an error during creation
        }
      })
      .catch(error => {
        console.error(error);
        toggleDisplayNone(byId('product-new')); // Render the form again if there was an error during creation
      });
  });
});


