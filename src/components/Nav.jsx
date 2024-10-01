import "../blocks/nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav__title">
        News Explorer
      </Link>
      <div className="nav__group">
        <Link to="/" className="nav__home-btn">
          Home
        </Link>
        <Link to="/saved-news" className="nav__saved-articles-btn">
          Saved Articles
        </Link>
        <Link to="/profile" className="nav__profile-btn">
          Username
        </Link>
      </div>
    </nav>
  );
}
