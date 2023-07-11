import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className={"navbar-brand"} to="/products">Amazon</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className={"nav-link"} to="/products">Products</NavLink>
          </li>
          { currentUser ? (
            <li className="nav-item">
              <NavLink className={"nav-link"} to="/products/new">New</NavLink>
            </li>
          ) : null }
        </ul>
        <ul className="navbar-nav ms-auto align-items-center">
          { currentUser ? (
              <li className="nav-item welcome-message">Welcome { currentUser.full_name }!</li>
          ) : (
            <li className="nav-item">
              <NavLink className={"nav-link"} to="/session/new">Sign In</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;