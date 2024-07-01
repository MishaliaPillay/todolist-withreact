import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodo";
import { useState } from "react";
import "./Heatmap.css";
import Heatmap from "./Heatmap";
const SidePanel = ({ searchQuery, setSearchQuery, addTodo, clearedItems }) => {
  console.log("Cleared Items in SidePanel:", clearedItems); // Log clearedItems
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Optionally, you can reset the state after a delay to stop the animation
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };
  return (
    <div className="side-panel">
      <h2>Welcome Back</h2>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddTodoButton
        className={isClicked ? "button-animation" : ""}
        onClick={handleClick}
        addTodo={addTodo}
      />
      <Link to="/calendar" className="link">
        <FontAwesomeIcon className="icon" icon={faCalendarAlt} />
        Go to Calendar
      </Link>
      <Link to="/" className="link">
        <FontAwesomeIcon className="icon" icon={faList} />
        All Tasks
      </Link>{" "}
      <Link to="/YearlyHeatmap" className="link">
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlassChart} />
        Your Report
      </Link>
      <Heatmap className="map" clearedItems={clearedItems} />
      {""}
    </div>
  );
};

export default SidePanel;
