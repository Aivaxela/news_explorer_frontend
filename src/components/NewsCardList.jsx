import { useEffect, useState } from "react";
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
      <div className="cards__elements">
        <ul className="cards__list">
          {searchResults.map((result, i) => {
            //TODO: replace key i with unique ID after backend integrated

            if (searchResults.indexOf(result) < searchResultsAmount) {
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
        <button className="cards__show-more" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}
