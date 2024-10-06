import "../blocks/NewsCardList.css";
import NewsCard from "./NewsCard";

export default function NewsCardList({
  resultsVisible,
  searchResults,
  searchResultsAmount,
}) {
  return (
    <section className={`cards ${resultsVisible ? "cards_visible" : ""}`}>
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        {searchResults.map((result, i) => {
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
        })}
      </ul>
    </section>
  );
}
