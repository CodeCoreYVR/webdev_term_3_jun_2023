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
        <nav className="ui secondary pointing menu">
            <NavLink className="item" to='/'>Home</NavLink> 
            <NavLink className="item" to='/questions'>Questions</NavLink> 
            {currentUser && <NavLink className="item" to='/questions/new'>New Question</NavLink>} 
            {currentUser ?
                <div className="right menu">
                    <div className="item">
                        <div className="ui orange label">
                            <CurrentDateTime/>
                        </div>
                    </div>
                    <div className="item">Welcome {currentUser.first_name}</div>   
                    <button className="ui primary blue button" onClick={handleSignOut}>Sign Out</button>
                    
                </div>
                :
                <div className="right menu">
                    <NavLink className="item" to={"/sign-in"}>Sign In</NavLink> 
                    <NavLink className="item" to={"/sign-up"}>Sign Up</NavLink>
                </div>
            }
        </nav>
    )
}

export default NavBar