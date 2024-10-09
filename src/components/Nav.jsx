import "../blocks/nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav__title">
        NewsExplorer
      </Link>
      <div className="nav__group">
        <Link to="/" className="nav__nav-item">
          Home
        </Link>
        <Link to="/saved-news" className="nav__nav-item">
          Saved Articles
        </Link>
        <button className="nav__signin-button">Sign in</button>
        <Link to="/profile" className="nav__nav-item-group">
          <div className="nav__user-icon-logout">
            <p className="nav__username">Riley</p>
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
