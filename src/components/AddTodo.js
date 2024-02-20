import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddTodoButton = ({ addTodo }) => {
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(new Date());

  const handleAddTodo = () => {
    console.log("handleAddTodo called");
    setShowAddTodoModal(true);
    console.log("Current Todo:", todo); // Log the current value of todo
    if (todo.trim() !== "") {
      // Create a new todo object
      const newTodo = {
        id: new Date().getTime(),
        task: todo,
        completed: false,
      };
      console.log("New Todo:", newTodo);
      // Call the addTodo function from props to add the new todo
      addTodo(newTodo);
      // Clear the input field
      setTodo("");
      // Close the modal
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowAddTodoModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the to-do item with the selected date
    addTodo(todo);
    // Clear form fields
    setTodo("");
    setDate(new Date());
    // Close the modal
    setShowAddTodoModal(false);
  };

  return (
    <div>
      {!showAddTodoModal && ( // Render button only if modal is not shown
        <button className="add-todo-btn" onClick={handleAddTodo}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add Todo
        </button>
      )}
      {/* Modal or Form for adding a to-do item */}
      {showAddTodoModal && (
        <div className="add-todo-modal">
          <h3>Add Todo</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter task"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              required
            />
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
            <button className="todo-btnn" onClick={handleAddTodo}>
              Add Todo
            </button>
            <button
              type="button"
              className="todo-btnn"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTodoButton;
