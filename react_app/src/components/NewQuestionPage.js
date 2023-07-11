import { Component } from "react";
import NewQuestion from "./NewQuestion";
import { Question } from "../request";
import { withRouter } from "./withRouter";

class NewQuestionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formError:null
        }
    }

    addQuestion = (title, body) => {
        Question.create({
            title: title,
            body: body,
        })
            .then((question) => {
                this.props.navigate(`/questions/${question.id}`)
            })
            .catch(err => {
                let errJson = JSON.parse(err.message)
                this.setState({
                    ...this.state,
                    formError: errJson,
                })
            })

    }

    render() {
        console.log(this.state.formError)
        return (
            <NewQuestion formError={this.state.formError} addQuestion={this.addQuestion} />)
    }
}

export default withRouter(NewQuestionPage)