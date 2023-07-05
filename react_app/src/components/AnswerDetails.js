import { QuestionShowContext } from "./QuestionShowPage"
import { useContext } from "react"

//import { AppContext } from "./"

const AnswerDetails = ({ id, body, author_name, created_at }) => {
  const deleteAnswer = useContext(QuestionShowContext)
  
  return (
    <div>
      <p>{body}</p>
      <p>By {author_name}</p>
      <p>
        <small>Created at:</small>
        <small>{created_at}</small>
      </p>
      {/* <QuestionShowContext.Consumer>
        {deleteAnswerById =>
          <button onClick={() => deleteAnswerById(id)}>Delete answer</button>
        }
      </QuestionShowContext.Consumer> */}
      <button onClick={() => deleteAnswer(id)}>Delete answer</button>
    </div>
  )
}


export default AnswerDetails