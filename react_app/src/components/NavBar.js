import { NavLink } from "react-router-dom"
import { Session } from "../request";

const NavBar = ({ currentUser, onSignOut }) => {
    const handleSignOut = () => {
        Session.destroy().then(() => {
            onSignOut();
            removeCookie("_awesome_answer_session")
        });
    };

    const getCookieValue = (cookieName) => {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${cookieName}=`))
            ?.split("=")[1];
        return cookieValue || "";
    }

    const removeCookie = (name, path, domain) => {
        if (getCookieValue(name)) {
            document.cookie = name + "=" +
                ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") +
                ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    }

    return (
        <nav>
            <NavLink to='/'>Home</NavLink> |
            <NavLink to='/questions'>Questions</NavLink> |
            {currentUser && <NavLink to='/questions/new'>New Question</NavLink>} |
            {currentUser ? (
                <>
                    <span>Welcome, {currentUser.first_name}</span> | 
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <NavLink to="/sign_in">Sign In</NavLink> |
                    <NavLink to="/sign_up">Sign Up</NavLink>
                </>
            )}
        </nav>
    )
}

export default NavBar