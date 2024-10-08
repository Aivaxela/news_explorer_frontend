import "../blocks/NewsCard.css";

export default function NewsCard({
  urlToImage,
  title,
  description,
  source,
  publishedAt,
}) {
  const publishedAtFormatted = new Date(publishedAt).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card">
      <img
        src="../src/assets/bookmark.svg"
        alt="boomark button on news article card"
        className="card__bookmark-button"
      />
      <img src={urlToImage} alt="" className="card__image" />
      <div className="card__text-container">
        <time className="card__date" dateTime="2024-10-04">
          {publishedAtFormatted}
        </time>
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <p className="card__source">{source}</p>
      </div>
    </div>
  );
}
