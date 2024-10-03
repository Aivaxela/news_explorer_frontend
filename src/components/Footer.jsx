import "../blocks/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__credit">
        &#169; 2024 Riley Marcum, Powered by{" "}
        <a href="https://newsapi.org/" className="footer__api-link">
          newsapi.org
        </a>
      </p>
      <div className="footer__links-group">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <Link to="https://tripleten.com" className="footer__link">
          TripleTen
        </Link>
        <a href="https://github.com/Aivaxela">
          <img
            src="../src/assets/github-icon.svg"
            alt="github link icon"
            className="footer__link-img"
          />
        </a>
      </div>
    </footer>
  );
}
