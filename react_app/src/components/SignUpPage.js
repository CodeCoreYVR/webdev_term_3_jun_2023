import React, { Component } from "react"
import { FloatingInput } from "./FloatingInput";
import { User } from "../request";
import { withRouter } from "./withRouter";

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: {},
            user: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
    }

    validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    handleChange = (e) => {
        let { name, value } = e.target;
        let { error } = this.state;

        if (["first_name", "last_name"].includes(name) && value.length > 50) {
            error[name] = "is too long"
        }
        else {
            error[name] = null
        }

        if (["first_name", "last_name"].includes(name)) {
            if (!/^[a-zA-Z]*$/.test(value)) {
                error[name] = "accepts only alphabets"
                value = this.state.user[name]
            }
        }

        this.setState({
            error: {
                ...this.state.error,
                error
            },
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    onBlur = (e) => {
        let { name, value } = e.target;
        let { error } = this.state;

        if(name === "email") {
            if(!this.validateEmail(value)) {
                error[name] = "is not in correct format"
            }
        }
        this.setState({
            ...this.state,
            error: {
                ...this.state.error,
                error
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
                    onBlur={this.onBlur}
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