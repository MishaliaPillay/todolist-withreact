import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageData, updateLocalStorageData } from "./LocalStorage";

export const TodoWrapper = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState({ entries: [] });

  useEffect(() => {
    const storedData = getLocalStorageData();
    if (storedData && storedData.todos) {
      setUserData(storedData);
      setTodos(storedData.todos);
    }
  }, []);

  const addTodo = (todo) => {
    const newTodo = {
      id: new Date().getTime(),
      task: todo,
      completed: false,
      isEditing: false,
      date: new Date().toISOString().split("T")[0],
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    updateStoredData({ todos: newTodos, entries: userData.entries });
  };

  const saveUserData = () => {
    const currentDate = new Date().toLocaleDateString();
    const existingEntryIndex = userData.entries.findIndex(
      (entry) => entry.date === currentDate
    );

    if (existingEntryIndex !== -1) {
      const updatedEntries = [...userData.entries];
      updatedEntries[existingEntryIndex].tasks = todos.map((todo) => todo.task);

      setUserData({
        entries: updatedEntries,
      });
    } else {
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

  const anyCompletedTodos = todos && todos.some((todo) => todo.completed);
  const todoCount = todos ? todos.length : 0;

  const filteredTodos = todos
    ? todos.filter((todo) =>
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
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

export const getStoredData = () => {
  return getLocalStorageData();
};

export const updateStoredData = (data) => {
  updateLocalStorageData(data);
};

export default TodoWrapper;
