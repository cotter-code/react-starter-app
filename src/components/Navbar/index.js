import { Link } from "@reach/router";
import React, { useContext } from "react";
import CotterContext from "../../contexts/userContext";
import "./styles.css";

function Navbar() {
  const { isLoggedIn, logout } = useContext(CotterContext);

  const onLogOut = async () => {
    await logout();
    window.location.href = "/";
  };
  return (
    <div className="Navbar__container">
      <div className="Navbar__container-item">
        <Link to="/">Home</Link>
      </div>
      <div className="Navbar__container-item">
        <Link to="/dashboard">Dashboard</Link>
      </div>
      {isLoggedIn ? (
        <div
          className="Navbar__container-item Navbar__card-button"
          onClick={onLogOut}
        >
          Logout
        </div>
      ) : (
        <div className="Navbar__container-item Navbar__card-button">
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
