import "../blocks/SearchForm.css";

export default function SearchForm() {
  return (
    <form className="search">
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          className="search__input"
          placeholder="Enter topic"
          required
        />
      </label>
      <button type="submit" className="search__btn">
        Search
      </button>
    </form>
  );
}
