// EditTodoForm.js

import React, { useState } from "react";

const EditTodoForm = ({ editTodo, task, saveUserData }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      editTodo(value, task.id);
      saveUserData(); // Call saveUserData after updating the task
    }
    saveUserData();
    setValue("");
  };

  return (
    <form className="EditTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Task Is Required"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn" onClick={saveUserData}>
        Done
      </button>
    </form>
  );
};

export default EditTodoForm;
