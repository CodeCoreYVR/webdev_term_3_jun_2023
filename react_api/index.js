function HelloWorld(props) {
    return <p
        className="heading"
        title="This is a paragraph">
        Hello {props.name || "world"}</p>
}


function InputGroup(props) {
    return <div>
        <label>Label</label>
        <Input />
    </div>
}

function Input(props) {
    console.log(props);
    return <input
        {...props}
    />
}

function InputEmail(props) {
    const checkEmail = (e) => {
        let value = e.target.value;
        if (value.includes("admin")) {
            console.log("Can not register with admin");
        }
    }

    return <div className="form-floating mb-3">
        <input
            type="email"
            className="form-control"
            id={props.id}
            maxLength={props.maxLength || "50"}
            minLength="3"
            //React does not work with onFocusIn or onFocusOut. Instead, we will need to use onFocus and onBlur
            onBlur={checkEmail}
            {...props.htmlAttributes}
        />
        <label
            htmlFor={props.id}>
            {props.label}</label>
    </div>
}

function InputPassword(props) {
    return <div className="form-floating mb-3">
        <input
            type="password"
            className="form-control"
            id={props.id}
            {...props.htmlAttributes} />
        <label
            htmlFor={props.id}>
            {props.label}</label>
    </div>
}

function Header(props) {
    return <h1
        className="display-6"
        {...props.htmlAttributes}
    >{props.content}</h1>
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<div>
    <form>
        <Header
            content="Registration"
            htmlAttributes={
                {
                    title: "This form is for registration"
                }
            }
        />
        <InputEmail
            id="username"
            label="Email"
            // maxLength="20"
            htmlAttributes={
                {
                    placeholder: "Enter your email address",
                    style: {
                        color: "#fff",
                        backgroundColor: "#000"
                    }
                }
            }
        />
        <InputPassword
            id="password"
            label="Password"
            htmlAttributes={
                {
                    placeholder: "Enter your password"
                }
            }
        />
        <InputPassword
            id="retype-password"
            label="Retype your password"
            htmlAttributes={
                {
                    placeholder: "Retype your password"
                }
            }
        />
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>

</div>)

// ReactDOM.render(

//     React.createElement(Input, { value: "codecore@email.com" }),
//     document.getElementById("root")
// )