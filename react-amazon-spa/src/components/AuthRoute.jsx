import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ isAuth, component: Component, ...rest }) => {
	if (isAuth) {
		return <Route {...rest} render={props => <Component {...props} />} />;
	} else {
		return <Redirect to="/session/new" />;
	}
};

export default AuthRoute;
