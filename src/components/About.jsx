import "../blocks/About.css";

export default function About() {
  return (
    <section className="about">
      <img
        src="../src/assets/images/me.jpg"
        alt="image of the author"
        className="about__image"
      />
      <div className="about__text-content">
        <h2 className="about__text-title">About the author</h2>
        <p className="about__text">
          Hello! Thank you for taking a moment to read my About section.
          <br />
          <br />
          My name is Riley Marcum. At the time of writing this, I have work
          experience in various areas of IT support, including desktop and
          mobile office technologies, security equipment, and industrial
          automation.
          <br />
          <br />
          I also have software development experience in a few different areas.
          I am trained in the MERN stack for web development and have completed
          multiple full-stack web applications. I&apos;ve used C# and Visual
          Studio for small Windows Forms Application projects. As a hobby,
          I&apos;ve used C# and the Godot engine for video game development.
          <br />
          <br />
          &quot;NewsExplorer&quot; was created by me to showcase my web
          development skills learned from attending the TripleTen Software
          Engineering program. It features a full-stack infrastructure,
          utilizing the technologies in the MERN stack.
        </p>
      </div>
    </section>
  );
}
