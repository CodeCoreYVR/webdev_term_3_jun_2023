const QuestionDetails = ({title, body, author, view_count, created_at, updated_at}) => {
    return(
        <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>By {author.full_name}</p>
            <p>
            <small>Seen {view_count} times</small>
            <small>Created: {created_at.toLocaleString}</small>
            <small>Last Editted: {updated_at.toLocaleString}</small>
            </p>
        </div>
    )
}

export default QuestionDetails