import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      {/* Search Bar */}
      <input
        className="searchField"
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
