import React, { useState } from "react";
import { User } from '../api/v1/usersApi';
import { useHistory } from "react-router-dom";
import FormErrors from "./FormErrors";

const SignInPage = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = event => {
    setUserDetails({
      ...userDetails,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    User.create(userDetails).then(response => {
      if (response.errors) {
        setErrors(response.errors);
        setUserDetails({
          password: "",
          password_confirmation: ""
        });
      } else {
        history.push("/session/new")
      }
    });
  }

  return (
    <div className="container mt-5">
      <div className="card border-light mx-auto">
        <div className="card-header bg-secondary text-white">
          <h3 className="card-title">Sign Up</h3>
        </div>
        <div className="card-body">
          <form onSubmit={ handleSubmit }>
            <div className="form-group">
              <label htmlFor="first_name"><strong>First Name: </strong></label> <br />
              <input className="form-control" type="text" name="first_name" id="first_name" onChange={ handleInputChange } value={ userDetails.first_name } />
              <FormErrors formField="first_name" errors={ errors } />
            </div>
            <div className="form-group">
              <label htmlFor="last_name"><strong>Last Name: </strong></label> <br />
              <input className="form-control" type="text" name="last_name" id="last_name" onChange={ handleInputChange } value={ userDetails.last_name } />
              <FormErrors formField="last_name" errors={ errors } />
            </div>
            <div className="form-group">
              <label htmlFor="email"><strong>Email: </strong></label> <br />
              <input className="form-control" type="email" name="email" id="email" onChange={ handleInputChange } value={ userDetails.email } />
              <FormErrors formField="email" errors={ errors } />
            </div>
            <div className="form-group">
              <label htmlFor="password"><strong>Password: </strong></label> <br />
              <input className="form-control" type="password" name="password" id="password" onChange={ handleInputChange } value={ userDetails.password } />
              <FormErrors formField="password" errors={ errors } />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation"><strong>Password Confirmation: </strong></label> <br />
              <input className="form-control" type="password" name="password_confirmation" id="password_confirmation" onChange={ handleInputChange } value={ userDetails.password_confirmation } />
              <FormErrors formField="password_confirmation" errors={ errors } />
            </div>
            <div className="card-footer text-center">
              <input className="btn btn-secondary mt-3" type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
