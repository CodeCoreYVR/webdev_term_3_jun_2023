const QuestionDetails = ({title, body, author_name, view_count, created_at, updated_at}) => {
    return(
        <div>
            <h2 className="ui header">{title}</h2>
            <p>{body}</p>
            <div><i class="user icon"></i> {author_name}</div>
            <div><i class="eye icon"></i> {view_count} times</div>
            <div><i class="paperclip icon"></i> {created_at}</div>
            <div><i class="edit icon"></i> {updated_at}</div>
        </div>
    )
}

export default QuestionDetails