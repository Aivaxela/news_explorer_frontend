import "../blocks/Main.css";
import Nav from "../components/Nav";
import About from "../components/About";

export default function Main() {
  return (
    <>
      <main className="main">
        <Nav />
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="main__search-elements">
          <label htmlFor="main-search" className="main__searchbar">
            <input
              type="text"
              className="main__search-input"
              id="main-search"
              placeholder="Enter topic"
            />
          </label>
          <button type="button" className="main__search-btn">
            Search
          </button>
        </div>
      </main>
      <About />
    </>
  );
}
