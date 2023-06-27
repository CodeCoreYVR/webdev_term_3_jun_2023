import React, { Component } from "react"
import QuestionDetails from "./QuestionDetails"
import AnswerList from "./AnswerList"
import { Question } from "../request"

class QuestionShowPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionData: {}
        };
    }

    componentDidMount() {
        Question.show(83)
        .then((fetchedQuestion) => {
            this.setState((state) => {
               return  {questionData: fetchedQuestion}
            })
        })
    }
    deleteAnswerById = (answerId) => {
        const filteredAnswers = this.state.questionData.answers.filter(x => x.id !== answerId);
        let questionData = {
            ...this.state.questionData,
            answers: filteredAnswers
        }
        this.setState({
            questionData: questionData
        })
    }

    render() {
        const { id, title, body, author_name, view_count, created_at, updated_at, answers } = this.state.questionData;
        return (
            <main>
                <QuestionDetails
                    id={id}
                    title={title}
                    body={body}
                    author_name={author_name}
                    view_count={view_count}
                    created_at={created_at}
                    updated_at={updated_at}
                    // If we want to send everything of the object (i.e. this.state), we will use this.state as deserializer
                    // {...this.state}
                />
                <AnswerList
                    answers={answers}
                    deleteAnswer={this.deleteAnswerById}
                />
            </main>
        )
    }
}

export default QuestionShowPage