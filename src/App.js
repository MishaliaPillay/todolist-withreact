import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import SidePanel from "./components/SidePanel";
import TodoWrapper from "./components/TodoWrapper";
import { ClearedItemsProvider } from "./components/ClearedItemsContext";

function App() {
  // Define state variables separately
  const [searchQuery, setSearchQuery] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [clearedItems, setClearedItems] = useState({});

  // Define addTodo function to update todoList state
  const addTodo = (newTodo) => {
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    console.log("New Todo List:", newTodoList); // Log the updated todo list
  };

  // Define updateClearedItems function to update clearedItems state
  const updateClearedItems = (updatedClearedItems) => {
    setClearedItems(updatedClearedItems);
  };

  return (
    <Router>
      <ClearedItemsProvider value={{ clearedItems, updateClearedItems }}>
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
                <TodoWrapper
                  searchQuery={searchQuery}
                  todoList={todoList}
                  setTodoList={setTodoList} // Pass todoList and setTodoList to TodoWrapper
                />
              } // Pass todoList to TodoWrapper
            />
            <Route
              path="/calendar"
              element={<Calendar todoList={todoList} />} // Pass todoList to Calendar
            />
          </Routes>
        </div>
      </ClearedItemsProvider>
    </Router>
  );
}

export default App;