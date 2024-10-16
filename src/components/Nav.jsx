import "../blocks/Nav.css";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";

export default function Nav({ handleSignout }) {
  const { userState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const location = useLocation();
  const isNavBlack = location.pathname === "/saved-news" ? true : false;
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <nav className={`nav ${isNavBlack ? "nav_black" : ""}`}>
      <Link to="/" className="nav__title">
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
              className={`nav__logout-icon ${
                isNavBlack ? "nav__logout-icon_black" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <button className="nav__hamburger" type="button">
        <img
          src={
            hamburgerOpen
              ? "../src/assets/close-hamburger.svg"
              : "../src/assets/hamburger.svg"
          }
          alt="hamburger menu open/close button"
          className="nav__hamburger-img"
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
        />
      </button>
    </nav>
  );
}
