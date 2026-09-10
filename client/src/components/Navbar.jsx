import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>Blogify</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/create-blog">Create Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;