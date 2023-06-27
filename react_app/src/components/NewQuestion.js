import React, { Component } from "react"

class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: ""
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;
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
        return (
            <>
                <input name="title" placeholder="Enter title" value={title} onChange={this.handleChange} />
                <input name="body" placeholder="Enter body" value={body} onChange={this.handleChange} />
                <button onClick={this.addQuestion}>Add Question</button>
            </>

        )
    }
}

export default NewQuestion