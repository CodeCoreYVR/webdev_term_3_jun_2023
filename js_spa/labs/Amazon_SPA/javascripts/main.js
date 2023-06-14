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
	}
};

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

// Upon loading the DOM, refresh the products
document.addEventListener('DOMContentLoaded', function() {
	refreshProducts();

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

  qS("nav").addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;

    if (target.dataset.page) {
      toggleDisplayNone(byId(target.dataset.page));
    }
  });
});


