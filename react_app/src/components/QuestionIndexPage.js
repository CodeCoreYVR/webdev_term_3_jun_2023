import { useState, useEffect } from "react";
import QuestionDeleteBtn from "./QuestionDeleteBtn";
import NewQuestion from "./NewQuestion";
import { Question } from "../request";
import { Link } from "react-router-dom";

export default function QuestionIndexPage(){
    const [questionsData, setQuestionsData] = useState([])

    useEffect(() => {
        Question.index()
        .then((questionsData) => {
            setQuestionsData(questionsData)
        })
    }, [])

    const deleteQuestionFromIndex = (id) => { // 23
        console.log(id)
        setQuestionsData(questionsData.filter(x => x.id != id)) // x.id != id is false, when id is 23
    }

    return (
        <main>
            {questionsData.map((question, index) => {
                return <div key={index}>
                    <Link to={`/questions/${question.id}`}>{question.title}</Link>
                    {/* We can write delete button like this that take effects in the same component */}
                    
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {deleteQuestionFromIndex(question.id)}}
                    >
                        Delete
                    </button>
                    
                    {/* If we want another compoment to make changes to this compoment, we will need to send the method as property */}
                    {/* <QuestionDeleteBtn
                        id={question.id}
                        deleteQuestion={this.deleteQuestionFromIndex}
                    /> */}
                </div>
            })}
        </main>
    )
}

// class QuestionIndexPage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             questionsData: []
//         };
//     }

//     componentDidMount() {
//         Question.index()
//         .then((questions) => {
//             this.setState((state) => {
//                 return(
//                     {questionsData: questions}
//                 )
//             })
//         })
//     }

//     deleteQuestionFromIndex = (id) => { // 23
//         const filteredQuestions = this.state.questionsData.filter(x => x.id != id) // x.id != id is false, when id is 23

//         // Everytime we do 'setState' the component re-renders the virtual dom
//         this.setState({
//             questionsData: filteredQuestions
//         });

//         //never do..
//         //this.state.questionData = filteredQuestions
//     }

    

//     render() {
//         return (
//             <main>
//                 {this.state.questionsData.map((question, index) => {
//                     return <div key={index}>
//                         <Link to={`/questions/${question.id}`}>{question.title}</Link>
//                         {/* We can write delete button like this that take effects in the same component */}
//                         {/* 
//                         <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => {this.deleteQuestionFromIndex(question.id)}}
//                         >Delete</button> */}
                        
//                         {/* If we want another compoment to make changes to this compoment, we will need to send the method as property */}
//                         {/* <QuestionDeleteBtn
//                             id={question.id}
//                             deleteQuestion={this.deleteQuestionFromIndex}
//                         /> */}
//                     </div>
//                 })}
//             </main>
//         )
//     }
// }

// export default QuestionIndexPage