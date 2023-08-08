import React, { Component } from "react"
import { FloatingInput } from "./FloatingInput";

class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: ""
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    addQuestion = () => {
        this.props.addQuestion(this.state.title, this.state.body);
        this.setState({
            title: "",
            body: ""
        })
    }


    render() {
        const { title, body } = this.state;
        console.log(this.props.formError)
        return (
            <>
                <FloatingInput
                    value={title}
                    id="title"
                    label="Title"
                    handleInput={this.handleChange}
                    err={this.props.formError?.title}
                />
                <FloatingInput
                    value={body}
                    id="body"
                    label="body"
                    handleInput={this.handleChange}
                    err={this.props.formError?.body}
                />
                {/* <input name="title" placeholder="Enter title" value={title} onChange={this.handleChange} />
                <input name="body" placeholder="Enter body" value={body} onChange={this.handleChange} /> */}
                <button className="ui right floated large blue button" onClick={this.addQuestion}>Add Question</button>
            </>

        )
    }
}

export default NewQuestion