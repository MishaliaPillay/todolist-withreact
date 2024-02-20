import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import SidePanel from "./components/SidePanel";
import TodoWrapper from "./components/TodoWrapper";
import React, { useState } from "react";

function App() {
  // Define state variables separately
  const [searchQuery, setSearchQuery] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Define addTodo function to update todoList state
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <Router>
      <div>
        <aside className="aside">
          <SidePanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addTodo={addTodo} // Pass addTodo function to SidePanel
          />
        </aside>

        <Routes>
          <Route
            path="/"
            element={
              <TodoWrapper searchQuery={searchQuery} todoList={todoList} />
            }
          />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>{" "}
    </Router>
  );
}

export default App;
