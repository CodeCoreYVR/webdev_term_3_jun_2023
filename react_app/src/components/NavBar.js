import { NavLink } from "react-router-dom"

const NavBar = ({ currentUser, onSignOut }) => {
    return (
        <nav>
            <NavLink to='/'>Home</NavLink> |
            <NavLink to='/questions'>Questions</NavLink> |
            {currentUser && <NavLink to='/questions/new'>New Question</NavLink>} | 
            {currentUser ?
                <>
                    <span>Welcome {currentUser.first_name}</span> |  
                    <NavLink to='/sign-out'>Sign Out</NavLink>
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