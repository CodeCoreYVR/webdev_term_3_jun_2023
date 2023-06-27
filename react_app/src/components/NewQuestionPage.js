import { Component } from "react";
import NewQuestion from "./NewQuestion";
import { Question } from "../request";
import { useNavigate } from "react-router-dom";

const withRouter = WrapppedComponent => props => {
    const navigate = useNavigate()
    return( <WrapppedComponent {...props} navigate={navigate} />)
}

class NewQuestionPage extends Component{
    constructor(props) {
        super(props)
    }

    addQuestion = (title, body) => {
        Question.create({
            title: title,
            body: body,
        }). then((question) => {
            this.props.navigate(`/questions/${question.id}`)
        })
        
    }

    render(){
        return(
        <NewQuestion addQuestion={this.addQuestion}/>)
    }
}

export default withRouter(NewQuestionPage)