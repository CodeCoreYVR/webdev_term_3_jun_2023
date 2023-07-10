import { Session } from '../api/v1/sessionsApi';

function SignInPage(props) {

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
        props.history.push('/');
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
            </div>
            {/* <hr></hr> */}
            <div className="form-group mt-3">
              <label htmlFor="password"><strong>Password: </strong></label> <br />
              <input className="form-control" type="password" name="password" id="password" />
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