import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("What is the task today?");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsEmpty(e.target.value.trim() === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      addTodo(value);
      setValue("");
      setPlaceholder("What is the task today?");
      setIsEmpty(true);
    } else {
      setPlaceholder("Please enter a task");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="inputContainer">
        <input
          type="text"
          className={`todo-input ${isEmpty ? "empty" : ""}`}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
