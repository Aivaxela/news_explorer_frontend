import "../blocks/Nav.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";

export default function Nav() {
  const { userState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);

  return (
    <nav className="nav">
      <Link to="/" className="nav__title">
        NewsExplorer
      </Link>
      <div className="nav__group">
        <Link to="/" className="nav__nav-item nav__nav-item_visible">
          Home
        </Link>
        <Link
          to="/saved-news"
          className={`nav__nav-item ${
            userState.loggedIn ? "nav__nav-item_visible" : ""
          }`}
        >
          Saved Articles
        </Link>
        <button
          className={`nav__signin-button ${
            userState.loggedIn ? "" : "nav__signin-button_visible"
          }`}
          onClick={() => setActiveModal("signin")}
        >
          Sign in
        </button>
        <Link
          to="/profile"
          className={`nav__nav-item-group ${
            userState.loggedIn ? "nav__nav-item-group_visible" : ""
          }`}
        >
          <div className="nav__user-icon-logout">
            <p className="nav__username">{userState.username}</p>
            <img
              src="../src/assets/logout.svg"
              alt="logout icon"
              className="nav__logout-icon"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
