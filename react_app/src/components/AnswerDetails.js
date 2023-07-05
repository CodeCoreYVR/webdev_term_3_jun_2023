import { QuestionShowContext } from "./QuestionShowPage"
import React, { useContext } from "react"

const AnswerDetails = ({ id, body, author_name, created_at }) => {
  const deleteAnswerById = useContext(QuestionShowContext)
  return (
    <div>
      <p>{body}</p>
      <p>By {author_name}</p>
      <p>
        <small>Created at:</small>
        <small>{created_at}</small>
      </p>

      {/* <QuestionShowContext.Consumer>
      {deleteAnswerById => {
        return (
          <button onClick={() => deleteAnswerById(id)}>Delete answer</button>
        )
      }}
      </QuestionShowContext.Consumer> */}
      
      <button onClick={() => deleteAnswerById(id)}>Delete answer</button>
    </div>
  )
}


export default AnswerDetails