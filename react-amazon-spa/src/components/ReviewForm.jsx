import FormErrors from "./FormErrors";

const ReviewForm = (props) => {
  const { review, onChange, onSubmit, buttonLabel, errors = {} } = props;
  
  const handleSubmit = function (event) {
    event.preventDefault();
    onSubmit(review);
  }

  return (
    <>
      <div className="card-header bg-secondary text-white">
        <h1 className="card-title">Create Review</h1>
      </div>
      <div className="card-body">
        <form onSubmit={ handleSubmit }>
          <div className="form-group">
            <label htmlFor="rating"><strong>Rating: </strong></label>
            <input value={ review.rating } onChange={ onChange } type="number" name="rating" id="rating" className='form-control' />
            <FormErrors formField="rating" errors={ errors } />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="body"><strong>Body: </strong></label>
            <textarea value={ review.body } onChange={ onChange } name="body" id="body" type="text" className='form-control' />
            <FormErrors formField="body" errors={ errors } />
          </div>
          <div className="card-footer text-center">
            <button type="submit" className='btn btn-secondary mt-3'>{ buttonLabel }</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;