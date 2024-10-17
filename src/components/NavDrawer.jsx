import "../blocks/Nav.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NavDrawer({ drawerOpen, handleDrawerSignin }) {
  const { userState } = useContext(UserContext);

  return (
    <nav
      className={`nav__drawer ${drawerOpen ? "nav__drawer_visible" : ""}`}
      aria-label="mobile navigation"
    >
      <Link
        to="/"
        className="nav__drawer-title"
        aria-label="desktop navigation"
      >
        NewsExplorer
      </Link>
      <div className="nav__drawer-box">
        <Link to="/" className={`nav__drawer-item nav__drawer-item_visible`}>
          Home
        </Link>
        <Link
          to="/saved-news"
          className={`nav__drawer-item nav__drawer-item_visible ${
            userState.loggedIn ? "nav__drawer-item_visible " : ""
          }`}
        >
          Saved Articles
        </Link>
        <button
          className={`nav__drawer-signin-button ${
            userState.loggedIn ? "" : "nav__drawer-signin-button_visible"
          }`}
          onClick={handleDrawerSignin}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}
