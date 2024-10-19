import "../blocks/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__credit">
        &#169; 2024 Riley Marcum, powered by{" "}
        <a
          href="https://newsapi.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__api-link"
        >
          newsapi.org
        </a>
      </p>
      <div className="footer__links-group">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <a
          href="https://tripleten.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/Aivaxela"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../src/assets/images/github-icon.svg"
            alt="github link icon"
            className="footer__link footer__link-img"
          />
        </a>
      </div>
    </footer>
  );
}
