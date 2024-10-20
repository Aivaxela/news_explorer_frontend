import "../blocks/NewsCard.css";
import bookmarkIcon from "../assets/images/bookmark.svg";
import bookmarkDeleteIcon from "../assets/images/bookmark-delete.svg";
import bookmarkFilledIcon from "../assets/images/bookmark-filled.svg";
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
  keyword,
  id,
  page,
}) {
  const { userState, addSavedArticle, removeSavedArticle } =
    useContext(UserContext);
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

  const handleUpdateSavedNews = () => {
    if (!bookmarked) {
      addSavedArticle({
        urlToImage: urlToImage,
        title: title,
        description: description,
        source: source,
        publishedAt: publishedAt,
        url: url,
        keyword: searchState.keyword,
        id: uuidv4(),
      });
    } else {
      removeSavedArticle(id);
    }
  };

  const handleBookmarkClick = () => {
    if (userState.loggedIn) {
      handleUpdateSavedNews();
      return;
    }
    setActiveModal("signin");
  };

  return (
    <div className="card">
      <div
        className={`card__bookmark ${
          bookmarked && page != "saved" ? "card__bookmark_disabled" : ""
        }`}
        tabIndex={0}
      >
        <div
          className={`card__bookmark-tooltip ${
            bookmarked && page != "saved"
              ? "card__bookmark-tooltip_disabled"
              : ""
          }`}
        >
          {userState.loggedIn && bookmarked
            ? "Remove from saved"
            : userState.loggedIn
            ? "Save article"
            : "Sign in to save article"}
        </div>
        <button
          className="card__bookmark-button"
          type="button"
          onClick={() => handleBookmarkClick()}
        >
          <img
            src={
              bookmarked && page === "saved"
                ? bookmarkDeleteIcon
                : bookmarked
                ? bookmarkFilledIcon
                : bookmarkIcon
            }
            alt="boomark button on news article card"
            className={
              bookmarked && page === "saved"
                ? "card__bookmark-button-delete"
                : bookmarked
                ? "card__bookmark-button-img_filled"
                : "card__bookmark-button-img"
            }
          />
        </button>
      </div>
      <div
        className={`card__keyword ${
          page === "saved" ? "card__keyword_visible" : ""
        }`}
      >
        {keyword}
      </div>
      <a
        href={`${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        <img
          src={urlToImage}
          alt="news article image"
          className="card__image"
        />
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
