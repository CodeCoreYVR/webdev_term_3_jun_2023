const AnswerDetails = ({id, body, author_name, created_at, deleteAnswer}) => {
    return (
      <div>
        <p>{body}</p>
        <p>By {author_name}</p>
        <p>
          <small>Created at:</small>
          <small>{created_at.toLocaleString}</small>
        </p>
        <button onClick={() => deleteAnswer(id)}>Delete answer</button>
      </div>
    )
}


export default AnswerDetails