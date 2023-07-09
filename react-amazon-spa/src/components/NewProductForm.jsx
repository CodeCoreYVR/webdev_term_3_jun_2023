const NewProductForm = props => {
	const handleSubmit = function (event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
    
		props.submitForm({
			seller: { full_name: "John Doe" },
			title: formData.get("title"),
			description: formData.get("description"),
			price: formData.get("price"),
			created_at: new Date(),
		});
		event.currentTarget.reset();
	};

	return (
    <div className="card border-light mx-auto">
      <div className="card-header bg-secondary text-white">
        <h1 className="card-title text-center">Product New</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"><strong>Title: </strong></label>
            <textarea name="title" id="title" type="text" className='form-control' />
          </div>
          <div className="form-group">
            <label htmlFor="description"><strong>Description: </strong></label>
            <textarea name="description" id="description" type="text" className='form-control' />
          </div>
          <div className="form-group">
            <label htmlFor="price"><strong>Price: </strong></label>
            <input type="number" name="price" id="price" className='form-control' />
          </div>
          <div className="card-footer text-center">
            <button type="submit" className='btn btn-secondary'>Create Product</button>
          </div>
        </form>
      </div>
    </div>
	);
};

export default NewProductForm;
