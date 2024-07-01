// EditTodoForm.js

import React, { useState } from "react";

const EditTodoForm = ({ editTodo, task, saveUserData }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      editTodo(value, task.id)
        .then(() => {
          setValue(""); // Reset value after successful state update
        })
        .catch((error) => {
          console.error("Error updating task:", error); // Handle potential errors
        });
    }
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
      <button
        type="submit"
        className="todo-btn"
        onClick={() => {
          editTodo(value, task.id, () => {
            // Hide the edit form or perform other actions after state update
            setValue("");
          });
        }}
      >
        Done
      </button>
    </form>
  );
};

export default EditTodoForm;
