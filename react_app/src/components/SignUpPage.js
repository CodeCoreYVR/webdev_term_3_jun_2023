import React, { Component } from "react"
import { FloatingInput } from "./FloatingInput";
import { User } from "../request";
import { withRouter } from "./withRouter";

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            user: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    createUser = () => {
        User.create({ user: this.state.user })
            .then(res => {
                this.props.onSignUp();

                this.props.navigate("/") // for older version, we could write this.props.history.push("/"), in that we don't need to wrap our compoment 'withRouter'
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    error: JSON.parse(err.message),
                })
            })
    }

    render() {
        const { first_name, last_name, email, password, password_confirmation } = this.state.user;
        const { error } = this.state;

        return (
            <>
                <h1>Sign up</h1>
                <FloatingInput
                    value={first_name}
                    id="first_name"
                    label="First Name"
                    handleInput={this.handleChange}
                    err={error?.first_name}
                />
                <FloatingInput
                    value={last_name}
                    id="last_name"
                    label="Last Name"
                    handleInput={this.handleChange}
                    err={error?.last_name}
                />
                <FloatingInput
                    value={email}
                    type="email"
                    id="email"
                    label="Email"
                    handleInput={this.handleChange}
                    err={error?.email}
                />
                <FloatingInput
                    value={password}
                    id="password"
                    label="Password"
                    type="password"
                    handleInput={this.handleChange}
                    err={error?.password}
                />
                <FloatingInput
                    value={password_confirmation}
                    type="password"
                    id="password_confirmation"
                    label="Confirm Password"
                    handleInput={this.handleChange}
                    err={error?.password_confirmation}
                //placeholder="Retype Password"
                />
                <button className="btn btn-lg btn-primary w-100 mb-5" onClick={this.createUser}>Sign up</button>
            </>

        )
    }
}

export default withRouter(SignUpPage)