
import { Session } from '../request'
import { useState } from 'react';
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { Alert } from './Alert';

function SignInPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)
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
            .catch(err => {
                setErrors(JSON.parse(err.message))
            })
    }

    return (
        <main>
            <h1>Sign In</h1>
            {
                errors && <Alert message={errors.message} />
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