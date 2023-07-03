import React, { Component } from "react"
import { FloatingInput } from "./FloatingInput";
import { User } from "../request";
import { history } from "./history";

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    createUser = () => {
        User.create({
            user: this.state.user
        })
        .then(res => {
            this.props.onSignUp();
            this.props.navigate("/")
        })
        .catch(err => {
            console.log(err)
        })
    }


    render() {
        const { first_name, last_name, email, password, password_confirmation } = this.state.user;

        return (
            <>
                <FloatingInput
                    value={first_name}
                    id="first_name"
                    label="First Name"
                    handleInput={this.handleChange}
                />
                <FloatingInput
                    value={last_name}
                    id="last_name"
                    label="Last Name"
                    handleInput={this.handleChange}
                />
                <FloatingInput
                    value={email}
                    type="email"
                    id="email"
                    label="Email"
                    handleInput={this.handleChange}
                />
                <FloatingInput
                    value={password}
                    id="password"
                    label="Password"
                    type="password"
                    handleInput={this.handleChange}
                />
                <FloatingInput
                    value={password_confirmation}
                    type="password"
                    id="password_confirmation"
                    label="Confirm Password"
                    handleInput={this.handleChange}
                />
                <button className="btn btn-primary w-100 btn-lg" onClick={this.createUser}>Sign up</button>
            </>

        )
    }
}

export default history(SignUpPage)