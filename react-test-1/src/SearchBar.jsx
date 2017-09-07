import React from 'react';
import './SearchBar.css';

function SearchBar({ onSubmit, onSearchChange, value }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="search-bar">
        <input
          type="text"
          onChange={onSearchChange}
          placeholder="Search Your Destiny"
          value={value}
        />
      </div>
    </form>
  );
}

export default SearchBar;
