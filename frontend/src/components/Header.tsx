import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, LogoutUser } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      {user ? (
        <a onClick={LogoutUser}>Logout</a>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </nav>
  );
};

export default Header;
