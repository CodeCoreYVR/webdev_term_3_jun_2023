import AnswerDetails from "./AnswerDetails"

//props =deserialize the prop ===> {answers, deleteAnswer}
const AnswerList = ({answers, deleteAnswer}) => {
    return(
        <div>
            { 
                answers ?
                answers.map((answer, index) => {
                    return <AnswerDetails
                        key={index}
                        body={answer.body}
                        author_name={answer.author_name}
                        created_at={answer.created_at}
                        id={answer.id}
                        deleteAnswer={deleteAnswer}
                    />
                })
                :
                null
            }
        </div>
    )
}

export default AnswerList;