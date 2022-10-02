import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>

      <Link to='/login'>Login</Link>
      <Link to='/logout'>Logout</Link>
    </nav>
  );
};

export default Navbar;
