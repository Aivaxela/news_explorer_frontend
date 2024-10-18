import "../blocks/Nav.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NavDrawer({
  drawerOpen,
  setDrawerOpen,
  handleDrawerSignin,
  handleSignout,
}) {
  const { userState } = useContext(UserContext);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

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
        <Link
          to="/"
          onClick={() => handleCloseDrawer()}
          className={`nav__drawer-item nav__drawer-item_visible`}
        >
          Home
        </Link>
        <Link
          to="/saved-news"
          onClick={() => handleCloseDrawer()}
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
        <button
          className={`nav__drawer-logout ${
            userState.loggedIn ? "nav__drawer-logout_visible" : ""
          }`}
          onClick={handleSignout}
          type="button"
        >
          <div className="nav__logout-contents">
            <p className="nav__logout-username">{userState.username}</p>
            <img
              src="../src/assets/logout.svg"
              alt="logout icon"
              className="nav__icon"
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
