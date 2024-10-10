import "../blocks/Nav.css";
import { Link } from "react-router-dom";

export default function Nav({ userContext }) {
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
            userContext.userState.loggedIn ? "nav__nav-item_visible" : ""
          }`}
        >
          Saved Articles
        </Link>
        <button
          className={`nav__signin-button ${
            userContext.userState.loggedIn ? "" : "nav__signin-button_visible"
          }`}
        >
          Sign in
        </button>
        <Link
          to="/profile"
          className={`nav__nav-item-group ${
            userContext.userState.loggedIn ? "nav__nav-item-group_visible" : ""
          }`}
        >
          <div className="nav__user-icon-logout">
            <p className="nav__username">{userContext.userState.username}</p>
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
