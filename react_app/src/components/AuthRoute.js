import { Navigate } from "react-router-dom";

const AuthRoute = ({ page, isLoggedIn }) => {
    return isLoggedIn ? page : <Navigate to="/sign-in" />
}

export default AuthRoute;