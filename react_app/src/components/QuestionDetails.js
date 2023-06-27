const QuestionDetails = ({title, body, author_name, view_count, created_at, updated_at}) => {
    return(
        <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>By {author_name}</p>
            <p>
            <small>Seen {view_count} times</small>
            <small>Created: {created_at}</small>
            <small>Last Editted: {updated_at}</small>
            </p>
        </div>
    )
}

export default QuestionDetails