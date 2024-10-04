import "../blocks/NewsCard.css";

export default function NewsCard() {
  return (
    <div className="card">
      <img
        src="https://a.fsdn.com/sd/topics/bitcoin_64.png"
        alt=""
        className="card__image"
      />
      <div className="card__text-container">
        <time className="card__date" dateTime="2024-10-04">
          October 4, 2024
        </time>
        <h3 className="card__title">
          Government of Bhutan Holds Over $825 Million, or Nearly a Third of Its
          GDP, in Bitcoin, Arkham Data Shows
        </h3>
        <p className="card__description">
          The government of Bhutan is currently holding over $828 million in
          bitcoin, according to onchain data by Arkham Intelligence. From a
          report: \"Unlike most governments, Bhutan's BTC does not come from law
          enforcement asset seizures, but from bitcoin mining The government of
          Bhutan is currently holding over $828 million in bitcoin, according to
          onchain data by Arkham Intelligence. From a report: \"Unlike most
          governments, Bhutan's BTC does not come from law enforcement asset
          seizures, but from bitcoin mining
        </p>
        <p className="card__source">Slashdot.org</p>
      </div>
    </div>
  );
}
