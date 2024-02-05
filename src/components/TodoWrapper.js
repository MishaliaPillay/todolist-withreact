import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageData, updateLocalStorageData } from "./LocalStorage";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState({ entries: [] });

  const allEntries = userData.entries;
  console.log("all entries", allEntries);

  useEffect(() => {
    const storedData = getLocalStorageData();
    console.log("stored data", storedData);
    if (storedData) {
      setUserData(storedData);
      setTodos(storedData.todos);
    }
  }, []);

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];

    setTodos(newTodos);
    console.log("Date:", new Date().toLocaleDateString());
    console.log("Number of Tasks:", newTodos.length);
  };

  const saveUserData = () => {
    const currentDate = new Date().toLocaleDateString();
    const existingEntryIndex = userData.entries.findIndex(
      (entry) => entry.date === currentDate
    );

    if (existingEntryIndex !== -1) {
      // Update existing entry
      const updatedEntries = [...userData.entries];
      updatedEntries[existingEntryIndex].tasks = todos.map((todo) => todo.task);

      setUserData({
        entries: updatedEntries,
      });
    } else {
      // Create a new entry
      const newEntry = {
        date: currentDate,
        tasks: todos.map((todo) => todo.task),
      };

      setUserData({
        entries: [...userData.entries, newEntry],
      });
    }

    updateLocalStorageData({ todos, entries: userData.entries });
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const anyCompletedTodos = todos.some((todo) => todo.completed);
  const todoCount = todos.length;

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}

      <div className="taskCount">
        <p>
          Tasks: {todoCount}{" "}
          <FontAwesomeIcon
            onClick={saveUserData}
            className="faSave"
            icon={faSave}
          />
        </p>
      </div>

      {anyCompletedTodos && (
        <button type="submit" className="clear-btn" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoWrapper;
