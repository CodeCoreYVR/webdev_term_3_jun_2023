import React, { useState } from 'react';
import { Session } from '../api/v1/sessionsApi';
import { useHistory } from "react-router-dom";
import FormErrors from './FormErrors';

function SignInPage(props) {
  const history = useHistory();
  const { onSignIn } = props;

  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    const params = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    Session.create(params).then((response) => {
      console.log('Session create response: ', response);
      if (response.id) {
        console.log("Sign In Successful!")
        onSignIn();
        history.push('/');
      } else if (response.errors) {
        setErrors(response.errors);
        // or below code if you want to use and test the errors state
        // setErrors(prevErrors => {
        //   const newErrors = [...prevErrors, ...response.errors];
        //   console.log("SignIn errors: ", newErrors);
        //   return newErrors;
        // });
      }
    });
  }

  return (
    <div className="container mt-5">
      <div className="card border-light mx-auto">
        <div className="card-header bg-secondary text-white">
          <h3 className="card-title">Log In</h3>
        </div>
        <div className="card-body">
          <form onSubmit={ handleSubmit }>
            <div className="form-group">
              <label htmlFor="email"><strong>Email: </strong></label> <br />
              <input className="form-control" type="email" name="email" id="email" />
              <FormErrors formField="email" errors={ errors } />
            </div>
            {/* <hr></hr> */}
            <div className="form-group mt-3">
              <label htmlFor="password"><strong>Password: </strong></label> <br />
              <input className="form-control" type="password" name="password" id="password" />
              <FormErrors formField="password" errors={ errors } />
            </div>
            <div className="card-footer text-center">
              <input className="btn btn-secondary mt-3" type="submit" value="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;