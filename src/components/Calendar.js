import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Retrieve saved todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  return (
    <div>
      <h1>Calendar Page</h1>
      {/* Display todos in a grid */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.task}</p>
            <p>{todo.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
