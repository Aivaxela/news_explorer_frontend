import "../blocks/NewsCardList.css";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import NewsCard from "./NewsCard";
import Preloader from "./Preloader";

export default function NewsCardList() {
  const { searchState, setSearchState } = useContext(SearchContext);

  const showMoreResults = () =>
    setSearchState((currState) => ({
      ...currState,
      articlesShown: Math.min(searchState.articlesShown + 3, 100),
    }));

  return (
    <>
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
            src="../src/assets/not-found_v1.svg"
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
              //TODO: replace key i with unique ID after backend integrated

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
    </>
  );
}
