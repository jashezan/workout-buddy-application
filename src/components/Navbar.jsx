import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <nav className="container navbar">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {user && (
            <div>
              <span>{user.email}</span>
              <button
                style={{ backgroundColor: "crimson" }}
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="btn-grp">
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Signup</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
