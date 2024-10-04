import "../blocks/NewsCardList.css";
import NewsCard from "./NewsCard";

export default function NewsCardList() {
  return (
    <section className="cards">
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        <NewsCard />
      </ul>
    </section>
  );
}
