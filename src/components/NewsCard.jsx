import "../blocks/NewsCard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import { SearchContext } from "../contexts/SearchContext";
import { v4 as uuidv4 } from "uuid";

export default function NewsCard({
  urlToImage,
  title,
  description,
  source,
  publishedAt,
  url,
}) {
  const { userState, setUserState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const { searchState } = useContext(SearchContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(
      userState.savedNews.some((article) => {
        return article.title == title && article.publishedAt == publishedAt;
      })
    );
  }, [userState, title, publishedAt]);

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
          url: url,
          id: uuidv4(),
        },
      ];
      const updatedSavedKeywords = [
        ...userState.savedKeywords,
        searchState.keyword,
      ];
      setUserState({
        ...userState,
        savedNews: updatedSavedNews,
        savedKeywords: updatedSavedKeywords,
      });
    } else {
      setUserState({
        ...userState,
        savedNews: [
          ...userState.savedNews.filter(
            (article) =>
              article.title != title && article.publishedAt != publishedAt
          ),
        ],
      });

      //TODO: find better way to set saved keywords? populate keywords el from state?
    }
  };

  const handleSignin = () => {
    setActiveModal("signin");
  };

  return (
    <div className="card">
      <div className="card__bookmark" tabIndex={0}>
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
      <a
        href={`${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img src={urlToImage} alt="" className="card__image" />
        <div className="card__text-container">
          <time className="card__date" dateTime="2024-10-04">
            {publishedAtFormatted}
          </time>
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
          <p className="card__source">{source}</p>
        </div>
      </a>
    </div>
  );
}
