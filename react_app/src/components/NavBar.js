import { NavLink } from "react-router-dom"
import { Session } from "../request"
// import { removeCookie } from "../helper/Helper"
import CurrentDateTime from "./CurrentDateTime"

const NavBar = ({ currentUser, onSignOut }) => {
    const handleSignOut = () => {
        Session.destroy().then(() => {
            onSignOut();
            //removeCookie("_awesome_answer_session");
        })
    }
    
    return (
        <nav>
            <NavLink to='/'>Home</NavLink> |
            <NavLink to='/questions'>Questions</NavLink> |
            {currentUser && <NavLink to='/questions/new'>New Question</NavLink>} | 
            {currentUser ?
                <>
                    <span>Welcome {currentUser.first_name}</span> |  
                    <button onClick={handleSignOut}>Sign Out</button>| 
                    <CurrentDateTime/>
                </>
                :
                <>
                    <NavLink to={"/sign-in"}>Sign In</NavLink> | 
                    <NavLink to={"/sign-up"}>Sign Up</NavLink>
                </>
            }
        </nav>
    )
}

export default NavBar