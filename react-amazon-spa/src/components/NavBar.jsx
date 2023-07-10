import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className={"navbar-brand"} to="/products">Amazon</NavLink>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={"nav-link"} to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={"nav-link"} to="/products/1">Product</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className={"nav-link"} to="/products/new">New</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;