import { useState } from "react";
import "../blocks/SearchForm.css";

export default function SearchForm({ handleSearchSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(value);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          className="search__input"
          placeholder="Enter topic"
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="search__btn">
        Search
      </button>
    </form>
  );
}
