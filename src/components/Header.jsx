import "../blocks/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__title">
        NewsExplorer
      </Link>
      <div className="header__nav-group">
        <Link to="/" className="header__home-btn">
          Home
        </Link>
        <Link to="/saved-articles" className="header__saved-articles-btn">
          Saved Articles
        </Link>
      </div>
    </header>
  );
}
