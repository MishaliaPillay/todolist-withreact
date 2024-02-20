import "./App.css";
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
    <div>
      <aside className="aside">
        <SidePanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          addTodo={addTodo} // Pass addTodo function to SidePanel
        />
      </aside>
      <div className="App">
        <TodoWrapper searchQuery={searchQuery} todoList={todoList} />{" "}
        {/* Pass todoList to TodoWrapper */}
        <section>
          <Calendar />
        </section>
      </div>
    </div>
  );
}

export default App;
