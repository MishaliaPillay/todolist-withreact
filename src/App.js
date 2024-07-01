import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import SidePanel from "./components/SidePanel";
import YearlyHeatmap from "./components/YearlyHeatmap";
import TodoWrapper from "./components/TodoWrapper";
import { ClearedItemsProvider } from "./components/ClearedItemsContext";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [clearedItems, setClearedItems] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <Router className="App">
      <Header />
      <ClearedItemsProvider value={{ clearedItems, updateClearedItems }}>
        <div className="content">
          <button className="burger-btn" onClick={togglePanel}>
            ☰
          </button>
          <aside className={`aside ${isPanelOpen ? "open" : ""}`}>
            <SidePanel
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              addTodo={addTodo}
            />
          </aside>
          <div className="">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="content">
                    <TodoWrapper
                      searchQuery={searchQuery}
                      todoList={todoList}
                      setTodoList={setTodoList}
                    />
                  </div>
                }
              />
              <Route path="/calendar" element={<Calendar todoList={todoList} />} />
              <Route path="/YearlyHeatmap" element={<YearlyHeatmap todoList={todoList} />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </ClearedItemsProvider>
    </Router>
  );
}

export default App;
