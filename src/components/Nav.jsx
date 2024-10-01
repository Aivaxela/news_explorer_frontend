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
        <Link to="/profile" className="nav__nav-item">
          Username
        </Link>
      </div>
    </nav>
  );
}
