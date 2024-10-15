import "../blocks/Nav.css";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";

export default function Nav() {
  const { userState, setUserState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const location = useLocation();
  const isNavBlack = location.pathname === "/saved-news" ? true : false;

  const handleSignoutClick = () => {
    setUserState({
      loggedIn: false,
      email: "",
      password: "",
      username: "",
      savedNews: [],
    });
  };

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
          className={`nav__nav-logout ${
            userState.loggedIn ? "nav__nav-logout_visible" : ""
          }`}
          onClick={() => handleSignoutClick()}
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
    </nav>
  );
}
