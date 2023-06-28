import React, { Component } from "react"
import { FloatingInput } from "./FloatingInput";

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
        //todo
    }


    render() {
        const { first_name, last_name, email, password, password_confirmation } = this.state.user;
        console.log(first_name)
        return (
            <>
                {/* <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={first_name} id="first_name" name="first_name"/>
                    <label htmlFor="first_name">First Name</label>
                </div> */}
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
            </>

        )
    }
}

export default SignUpPage