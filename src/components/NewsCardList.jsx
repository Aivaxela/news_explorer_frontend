import "../blocks/NewsCardList.css";
import NewsCard from "./NewsCard";
import Preloader from "./Preloader";

export default function NewsCardList({
  resultsVisible,
  resultsLoading,
  searchResults,
  searchResultsShown,
  showMoreResults,
}) {
  return (
    <>
      <div
        className={`cards__loading ${
          resultsLoading ? "cards__loading_visible" : ""
        }`}
      >
        <Preloader />
        <p className="cards__loading-title">Searching for news...</p>
      </div>
      <section className={`cards ${resultsVisible ? "cards_visible" : ""}`}>
        <h2 className="cards__title">Search results</h2>
        <div className="cards__elements">
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
            className="cards__show-more"
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
