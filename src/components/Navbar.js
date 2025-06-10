import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <div className="nav-logo border">
          <div className="logo"></div>
      </div>
      
      {/* out */}
      
      <div className="navbar-brand"> | O N Y X  </div>
    </nav>
  );
};

export default Navbar;