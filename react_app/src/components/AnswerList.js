import AnswerDetails from "./AnswerDetails"

//props =deserialize the prop ===> {answers}
const AnswerList = ({answers}) => {
    return(
        <div>
            { 
                answers ?
                answers.map((answer, index) => {
                    return <AnswerDetails
                        key={index}
                        {...answer}
                    />
                })
                :
                null
            }
        </div>
    )
}

export default AnswerList;