import FormErrors from './FormErrors';

const ProductForm = props => {
  const { product, onChange, onSubmit, buttonLabel, title, errors = {} } = props;

	const handleSubmit = function (event) {
		event.preventDefault();
		// const formData = new FormData(event.currentTarget);
    // console.log('formData: ', formData);
		// onSubmit({
		// 	seller: { full_name: "John Doe" },
		// 	title: formData.get("title"),
		// 	description: formData.get("description"),
		// 	price: formData.get("price"),
		// 	created_at: new Date(),
		// });
		// event.currentTarget.reset();
    onSubmit(product);
	};

	return (
    <div className="card border-light mx-auto">
      <div className="card-header bg-secondary text-white">
        <h1 className="card-title text-center">{ title }</h1>
      </div>
      <div className="card-body">
        <form onSubmit={ handleSubmit }>
        <FormErrors formField="base" errors={ errors } />
          <div className="form-group">
            <label htmlFor="title"><strong>Title: </strong></label>
            <textarea defaultValue={ product.title } onChange={ onChange } name="title" id="title" type="text" className='form-control' />
            <FormErrors formField="title" errors={ errors } />
          </div>
          <div className="form-group">
            <label htmlFor="description"><strong>Description: </strong></label>
            <textarea defaultValue={ product.description } onChange={ onChange } name="description" id="description" type="text" className='form-control' />
            <FormErrors formField="description" errors={ errors } />
          </div>
          <div className="form-group">
            <label htmlFor="price"><strong>Price: </strong></label>
            <input defaultValue={ product.price } onChange={ onChange } type="number" name="price" id="price" className='form-control' />
            <FormErrors formField="price" errors={ errors } />
          </div>
          <div className="card-footer text-center">
            <button type="submit" className='btn btn-secondary mt-3'>{ buttonLabel }</button>
          </div>
        </form>
      </div>
    </div>
	);
};

export default ProductForm;
