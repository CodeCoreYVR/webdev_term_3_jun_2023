const QuestionDeleteBtn = (props) => {
    return (
        <button
            className="btn btn-sm btn-danger"
            onClick={() => {props.deleteQuestion(props.id)}}
        >Delete</button>
    )
}

export default QuestionDeleteBtn