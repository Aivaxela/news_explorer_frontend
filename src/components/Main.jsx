import "../blocks/Main.css";
import Nav from "../components/Nav";
import About from "../components/About";
import SearchForm from "./SearchForm";
import NewsCardList from "./NewsCardList";

export default function Main({
  resultsVisible,
  resultsLoading,
  handleSearchSubmit,
  searchResults,
  searchResultsShown,
  showMoreResults,
}) {
  return (
    <>
      <main className="main">
        <Nav />
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm handleSearchSubmit={handleSearchSubmit} />
      </main>
      <NewsCardList
        resultsVisible={resultsVisible}
        searchResults={searchResults}
        searchResultsShown={searchResultsShown}
        showMoreResults={showMoreResults}
        resultsLoading={resultsLoading}
      />
      <About />
    </>
  );
}
