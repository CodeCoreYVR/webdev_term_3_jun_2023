import { Route, Navigate } from "react-router-dom";

 const AuthRoute = ({page, isLoggedIn}) => {
   return isLoggedIn ? page : <Navigate to="/sign_in" />
 };

 export default AuthRoute;