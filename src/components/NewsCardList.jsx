import "../blocks/NewsCardList.css";
import NewsCard from "./NewsCard";
import Preloader from "./Preloader";

export default function NewsCardList({
  resultsVisible,
  resultsLoading,
  searchResults,
  searchResultsShown,
  showMoreResults,
  showNothingFound,
}) {
  return (
    <>
      <section className="cards">
        <div
          className={`cards__loading ${
            resultsLoading ? "cards__loading_visible" : ""
          }`}
        >
          <Preloader />
          <p className="cards__loading-title">Searching for news...</p>
        </div>
        <div
          className={`cards__nothing-found ${
            showNothingFound ? "cards__nothing-found_visible" : ""
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
            resultsVisible ? "cards__elements_visible" : ""
          }`}
        >
          <h2 className="cards__title">Search results</h2>
          <ul className="cards__list">
            {searchResults.map((result, i) => {
              //TODO: replace key i with unique ID after backend integrated

              if (searchResults.indexOf(result) < searchResultsShown) {
                return (
                  <NewsCard
                    urlToImage={result.urlToImage}
                    title={result.title}
                    description={result.description}
                    source={result.source.name}
                    publishedAt={result.publishedAt}
                    key={i}
                  />
                );
              }
            })}
          </ul>
          <button
            className={`cards__show-more ${
              searchResults.length > searchResultsShown
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
