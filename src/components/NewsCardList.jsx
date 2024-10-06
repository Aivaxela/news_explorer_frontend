import "../blocks/NewsCardList.css";
import NewsCard from "./NewsCard";

export default function NewsCardList({ resultsVisible }) {
  return (
    <section className={`cards ${resultsVisible ? "cards_visible" : ""}`}>
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        <NewsCard />
      </ul>
    </section>
  );
}
