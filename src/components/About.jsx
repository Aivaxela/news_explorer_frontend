import "../blocks/About.css";

export default function About() {
  return (
    <section className="about">
      <img
        src="../src/assets/me.jpg"
        alt="image of the author"
        className="about__image"
      />
      <div className="about__text-content">
        <h2 className="about__text-title">About the author</h2>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br />
          <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}
