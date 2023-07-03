
import { Session } from '../request'
import { useNavigate } from "react-router-dom";

function SignInPage(props) {
    const navigate = useNavigate()
    function handleSubmit(event) {
        event.preventDefault();
        const { target } = event;
        const formData = new FormData(target);
        const request = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        Session.create(request)
            .then((data) => {
                if(data?.id) {
                    props.onSignIn();
                    navigate("/");
                }
            })
    }

    return (
        <main>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <input type="submit" value="Sign In" />
            </form>
        </main>
    )
}

export default SignInPage;