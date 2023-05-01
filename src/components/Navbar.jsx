import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
      </nav>
      
    </header>
  );
};

export default Navbar;
