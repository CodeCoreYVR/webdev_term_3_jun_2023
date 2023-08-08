import { QuestionShowContext } from "./QuestionShowPage"
import { useContext } from "react"

//import { AppContext } from "./"

const AnswerDetails = ({ id, body, author_name, created_at }) => {
  const deleteAnswer = useContext(QuestionShowContext)
  
  return (
    <div className="ui clearing segment">
      <div className="ui header">{body}</div>
      <div>
        <i class="user icon"></i> 
        {author_name}
        <button 
          className="circular ui right floated compact icon red button" 
          onClick={() => deleteAnswer(id)}
        >
          <i class="delete icon"></i>
        </button>
      </div>
      <div><i class="paperclip icon"></i> {created_at}</div>
      {/* <QuestionShowContext.Consumer>
        {deleteAnswerById =>
          <button onClick={() => deleteAnswerById(id)}>Delete answer</button>
        }
      </QuestionShowContext.Consumer> */}
      
    </div>
  )
}


export default AnswerDetails