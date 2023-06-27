import { NavLink } from "react-router-dom"

const NavBar = (props) => {
    return(
        <nav>
            <NavLink to='/'>Home</NavLink>|
            <NavLink to='/questions'>Questions</NavLink>
        </nav>
    )
}

export default NavBar