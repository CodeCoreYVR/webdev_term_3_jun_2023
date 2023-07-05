import AnswerDetails from "./AnswerDetails"

//props =deserialize the prop ===> {answers, deleteAnswer}
const AnswerList = ({ answers }) => {
    return (
        <>
            {
                answers?.length && <div>
                    <h4>Answers:</h4>
                    {
                        answers.map((answer, index) => {
                            return <AnswerDetails
                                key={answer.id}
                                {...answer}
                            />
                        })
                    }
                </div>
            }
        </>
    )
}

export default AnswerList;