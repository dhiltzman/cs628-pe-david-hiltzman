import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <span className="navbar-title">Cities Application</span>
    <div className="navbar-links">
      <NavLink to="/cities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Cities List
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Add City
      </NavLink>
    </div>
  </nav>
);

export default Navbar;