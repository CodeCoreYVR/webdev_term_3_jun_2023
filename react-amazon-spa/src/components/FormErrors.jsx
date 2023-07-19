const FormErrors = props => {
  const { errors, formField } = props;

  let filteredErrors = errors;

  if (formField) {
    filteredErrors = errors.filter(err => err.field === formField);
  }

  return (
    <ul className="FormErrors">
      { filteredErrors.map((error, index) => (
        <li className="errors" key={ index }>{error.field}: { error.message }</li>
      ))}
    </ul>
  )
}

export default FormErrors;