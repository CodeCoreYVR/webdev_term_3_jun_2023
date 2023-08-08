
import { Session } from '../request'
import { useState } from 'react';
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { FormError } from './FormError';

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
            <h1 className="ui horizontal divider header">Sign In</h1>
            {
                errors && <FormError message={errors.message} />
            }
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(event) => {
                        setEmail(event.currentTarget.value)
                    }} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(event) => {
                        setPassword(event.currentTarget.value)
                    }} />
                   
                </div>
                <input className="ui right floated large blue button" type="submit" value="Sign In" />
            </form>
        </main>
    )
}

export default SignInPage;