import "../blocks/Nav.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import NavDrawer from "./NavDrawer";

export default function Nav({ handleSignout }) {
  const location = useLocation();
  const { userState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const [isNavBlack, setIsNavBlack] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerSignin = () => {
    setActiveModal("signin");
    setDrawerOpen(false);
  };

  useEffect(() => {
    setIsNavBlack(location.pathname === "/saved-news" ? true : false);
  }, [location]);

  return (
    <nav className={`nav ${isNavBlack ? "nav_black" : ""}`}>
      <Link to="/" className="nav__title" aria-label="desktop navigation">
        NewsExplorer
      </Link>
      <div className="nav__group">
        <Link
          to="/"
          className={`nav__nav-item nav__nav-item_visible ${
            location.pathname === "/" ? "nav__nav-item_highlight" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/saved-news"
          className={`nav__nav-item ${
            userState.loggedIn ? "nav__nav-item_visible" : ""
          } ${
            location.pathname === "/saved-news" ? "nav__nav-item_highlight" : ""
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
        <button
          className={`nav__logout ${
            userState.loggedIn ? "nav__logout_visible" : ""
          }`}
          onClick={handleSignout}
          type="button"
        >
          <div className="nav__logout-contents">
            <p className="nav__logout-username">{userState.username}</p>
            <img
              src="../src/assets/logout.svg"
              alt="logout icon"
              className={`nav__icon ${isNavBlack ? "nav__icon_black" : ""}`}
            />
          </div>
        </button>
      </div>
      <button
        className="nav__drawer-icon"
        type="button"
        onClick={handleDrawerToggle}
      >
        <img
          src={
            drawerOpen
              ? "../src/assets/nav-drawer-close.svg"
              : "../src/assets/nav-drawer.svg"
          }
          alt="drawer menu open/close button"
          className={` ${isNavBlack && !drawerOpen ? "nav__icon_black" : ""}`}
        />
      </button>

      <NavDrawer
        drawerOpen={drawerOpen}
        handleDrawerSignin={handleDrawerSignin}
        isNavBlack={isNavBlack}
      />
    </nav>
  );
}
