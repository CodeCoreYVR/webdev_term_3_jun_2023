
import { Session } from '../request'
import { useState } from 'react';
import { createRoutesFromChildren, useNavigate } from "react-router-dom";

function SignInPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    function handleSubmit(event) {
        event.preventDefault();

        const request = {
            email: email,
            password: password
        }

        Session.create(request)
            .then((data) => {
                console.log(data)
                if (data.status === 401){
                    setErrors([...errors, {message: data.message}])
                }
                if(data?.id) {
                    props.onSignIn();
                    navigate("/");
                }
            })
    }

    return (
        <main>
            <h1>Sign In</h1>
            {
                errors.length > 0 ? (
                    <div>
                        <h4>Failed to Sign</h4>
                        <p>{errors.map((error) => error.message).join(", ")}</p>
                    </div>
                ) :
                ("")
            }
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(event) => {
                        setEmail(event.currentTarget.value)
                    }} />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(event) => {
                        setPassword(event.currentTarget.value)
                    }} />
                    <label htmlFor="password">Password</label>
                </div>
                <input type="submit" value="Sign In" />
            </form>
        </main>
    )
}

export default SignInPage;