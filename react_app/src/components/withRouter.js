import { useNavigate } from "react-router-dom";

export const withRouter = WrapppedComponent => props => {
    const navigate = useNavigate()
    return( <WrapppedComponent {...props} navigate={navigate} />)
}