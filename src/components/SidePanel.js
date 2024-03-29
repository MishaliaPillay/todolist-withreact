import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodo";

const SidePanel = ({ searchQuery, setSearchQuery, addTodo }) => {
  return (
    <div className="side-panel">
      <h2>Welcome Back</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddTodoButton addTodo={addTodo} />
      <Link to="/calendar" className="link">
        <FontAwesomeIcon className="icon" icon={faCalendarAlt} />
        Go to Calendar
      </Link>
      <Link to="/" className="link">
        <FontAwesomeIcon className="icon" icon={faList} />
        All Tasks
      </Link>
    </div>
  );
};

export default SidePanel;
