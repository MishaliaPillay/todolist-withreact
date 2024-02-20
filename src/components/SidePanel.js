import React from "react";
import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodo";
const SidePanel = ({ searchQuery, setSearchQuery, addTodo }) => {
  return (
    <div className="side-panel">
      <h2>Search Tasks</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddTodoButton addTodo={addTodo} />
    </div>
  );
};

export default SidePanel;
