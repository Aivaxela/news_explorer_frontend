import "../blocks/NewsCard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

export default function NewsCard({
  urlToImage,
  title,
  description,
  source,
  publishedAt,
}) {
  const { userState, setUserState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(
      userState.savedNews.some((article) => {
        return article.title == title && article.publishedAt == publishedAt;
      })
    );
  }, [userState]);

  const publishedAtFormatted = new Date(publishedAt).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updateSavedNews = () => {
    if (!bookmarked) {
      const updatedSavedNews = [
        ...userState.savedNews,
        {
          urlToImage: urlToImage,
          title: title,
          description: description,
          source: source,
          publishedAt: publishedAt,
        },
      ];
      setUserState({
        ...userState,
        savedNews: updatedSavedNews,
      });
    } else {
      const updatedSavedNews = [
        ...userState.savedNews.filter(
          (article) =>
            article.title != title && article.publishedAt != publishedAt
        ),
      ];
      setUserState({
        ...userState,
        savedNews: updatedSavedNews,
      });
    }
  };

  const handleSignin = () => {
    setActiveModal("signin");
  };

  return (
    <div className="card">
      <div className="card__bookmark">
        <button
          className={`card__bookmark-signin ${
            userState.loggedIn ? "card__bookmark-signin_inactive" : ""
          }`}
          type="button"
          onClick={() => handleSignin()}
        >
          Sign in to save articles
        </button>
        <button
          className={`card__bookmark-button ${
            userState.loggedIn ? "card__bookmark-button_allowed" : ""
          }`}
          type="button"
          onClick={() => {
            if (userState.loggedIn) updateSavedNews();
          }}
        >
          <img
            src={
              bookmarked
                ? "../src/assets/bookmark-filled.svg"
                : "../src/assets/bookmark.svg"
            }
            alt="boomark button on news article card"
            className={
              bookmarked
                ? "card__bookmark-button-img_filled"
                : "card__bookmark-button-img"
            }
          />
        </button>
      </div>
      <Link to={`${urlToImage}`}>
        <img src={urlToImage} alt="" className="card__image" />
        <div className="card__text-container">
          <time className="card__date" dateTime="2024-10-04">
            {publishedAtFormatted}
          </time>
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
          <p className="card__source">{source}</p>
        </div>
      </Link>
    </div>
  );
}
