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
      <label htmlFor="search" className="search__label">
        <input
          id="search"
          type="text"
          className="search__input"
          placeholder="Enter topic"
          maxLength="20"
          value={value}
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
