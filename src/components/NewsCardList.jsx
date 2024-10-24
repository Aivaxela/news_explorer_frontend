import "../blocks/NewsCardList.css";
import nothingFoundImg from "../assets/images/not-found_v1.svg";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import NewsCard from "./NewsCard";
import Preloader from "./Preloader";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function NewsCardList() {
  const { searchState, setSearchState } = useContext(SearchContext);
  const { userState } = useContext(UserContext);
  const location = useLocation();

  const showMoreResults = () =>
    setSearchState((currState) => ({
      ...currState,
      articlesShown: Math.min(searchState.articlesShown + 3, 100),
    }));

  if (location.pathname === "/") {
    return (
      <section className="cards">
        <div
          className={`cards__loading ${
            searchState.loading ? "cards__loading_visible" : ""
          }`}
        >
          <Preloader />
          <p className="cards__loading-title">Searching for news...</p>
        </div>
        <div
          className={`cards__nothing-found ${
            searchState.nothingFound ? "cards__nothing-found_visible" : ""
          }`}
        >
          <img
            src={nothingFoundImg}
            alt="nothing found image"
            className="cards__nothing-found-image"
          />
          <h3 className="cards__nothing-found-title">Nothing found</h3>
          <p className="cards__nothing-found-description">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
        <div
          className={`cards__elements ${
            searchState.results.length > 0 && !searchState.loading
              ? "cards__elements_visible"
              : ""
          }`}
        >
          <h2 className="cards__title">Search results</h2>
          <ul
            className={`cards__list ${
              searchState.loading ? "" : "cards__list_visible"
            }`}
          >
            {searchState.results.map((result, i) => {
              if (
                searchState.results.indexOf(result) < searchState.articlesShown
              ) {
                return (
                  <NewsCard
                    urlToImage={result.urlToImage}
                    title={result.title}
                    description={result.description}
                    source={result.source.name}
                    publishedAt={result.publishedAt}
                    url={result.url}
                    page={""}
                    key={i}
                  />
                );
              }
            })}
          </ul>
          <button
            className={`cards__show-more ${
              searchState.results.length > searchState.articlesShown
                ? "cards__show-more_visible"
                : ""
            } `}
            type="button"
            onClick={() => showMoreResults()}
          >
            Show more
          </button>
        </div>
      </section>
    );
  }

  if (location.pathname === "/saved-news") {
    return (
      <>
        <section className="cards">
          <div className="cards__elements cards__elements_visible">
            <div
              className={`cards__nothing-found ${
                userState.savedNews.length === 0
                  ? "cards__nothing-found_visible"
                  : ""
              }`}
            >
              <img
                src={nothingFoundImg}
                alt="nothing found image"
                className="cards__nothing-found-image"
              />
              <h3 className="cards__nothing-found-title">Nothing found</h3>
              <p className="cards__nothing-found-description">
                Articles that you save will appear here.
              </p>
            </div>
            <ul className="cards__list cards__list_visible">
              {userState.savedNews.map((article) => {
                return (
                  <NewsCard
                    urlToImage={article.urlToImage}
                    title={article.title}
                    description={article.description}
                    source={article.source.name}
                    publishedAt={article.publishedAt}
                    url={article.url}
                    keyword={article.keyword}
                    page={"saved"}
                    id={article.id}
                    key={article._id}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </>
    );
  }
}
