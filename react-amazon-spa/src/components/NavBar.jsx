import { NavLink } from 'react-router-dom';
import { Session } from '../api/v1/sessionsApi';

const NavBar = ({ currentUser, onSignOut }) => {
  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut();
    });
  };

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
        { currentUser ? (
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item welcome-message">Welcome { currentUser.full_name }!</li>
            <li className="nav-item"><button className={ "nav-link" } onClick={ handleSignOut }>Sign Out</button></li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><NavLink className={"nav-link"} to="/session/new">Sign In</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/users/new">Sign Up</NavLink></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;