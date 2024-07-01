// TodoWrapper.js

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageData, updateLocalStorageData } from "./LocalStorage";
const SaveButton = ({ saveUserData }) => {
  const [isShrinking, setIsShrinking] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);

  const handleClick = () => {
    setIsShrinking(true);
    setTimeout(() => {
      setIsShrinking(false);
      setIsGrowing(true);
      setTimeout(() => setIsGrowing(false), 500);
    }, 500);
    saveUserData(); // Call saveUserData after animation
  };

  return (
    <FontAwesomeIcon
      icon={faSave}
      className={`faSave ${isShrinking ? "shrink-animation" : ""} ${
        isGrowing ? "grow-animation" : ""
      }`}
      onClick={handleClick}
    />
  );
};

export const TodoWrapper = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState({ entries: [] });
  const [clearedItems, setClearedItems] = useState({}); // Initialize clearedItems state
  const storedData = getLocalStorageData();

  // Log the stored data to the console
  console.log("Stored Data:", storedData);
  useEffect(() => {
    const storedData = getLocalStorageData();
    if (storedData && storedData.todos) {
      setUserData(storedData);
      setTodos(storedData.todos);
      setClearedItems(storedData.clearedItems || {});
    }
  }, []);

  const addTodo = (todo) => {
    const newTodo = {
      id: new Date().getTime(),
      task: todo,
      completed: false,
      isEditing: false, // Initialize isEditing state
      date: new Date().toISOString().split("T")[0],
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    updateStoredData({
      todos: newTodos,
      entries: userData.entries,
      clearedItems: updateClearedItems(newTodos, clearedItems),
    });
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      console.log("Updated Todos:", updatedTodos); // Log updated todos
      saveUserData(updatedTodos); // Call saveUserData after updating state
      updateStoredData({
        todos: updatedTodos,
        entries: userData.entries,
        clearedItems: updateClearedItems(updatedTodos, clearedItems),
      }); // Update local storage data
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      updateStoredData({
        todos: updatedTodos,
        entries: userData.entries,
        clearedItems: updateClearedItems(updatedTodos, clearedItems),
      }); // Update local storage immediately
      return updatedTodos;
    });

    saveUserData(); // Call saveUserData after updating state
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  // TodoWrapper (editTask function)

  const editTask = (task, id) => {
    return new Promise((resolve) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
      saveUserData(todos); // Pass the updated todos
      resolve(); // Resolve the promise after state update
    });
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => {
      // Extracting the cleared items logic
      const updatedClearedItems = updateClearedItems(prevTodos, clearedItems); // Call the locally defined updateClearedItems function

      // Update the state with the new cleared items
      setClearedItems(updatedClearedItems);
      console.log("Cleared Items:", updatedClearedItems);

      // Update local storage data
      updateStoredData({
        todos: prevTodos.filter((todo) => !todo.completed),
        entries: userData.entries,
        clearedItems: updatedClearedItems,
      });

      // Return the filtered todos
      return prevTodos.filter((todo) => !todo.completed);
    });
  };

  const updateClearedItems = (prevTodos = [], clearedItems = {}) => {
    // Check if prevTodos or clearedItems are undefined and assign default values if necessary
    if (!prevTodos || !clearedItems) {
      console.error("prevTodos or clearedItems is undefined");
      return {};
    }

    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0];

    // Filter completed items for the current date
    const completedTodos = prevTodos.filter(
      (todo) => todo.completed && todo.date === currentDate
    );

    const completedTasks = completedTodos.map((todo) => todo.task);
    const updatedClearedItems = {
      ...clearedItems,
      [currentDate]: {
        tasks: [...(clearedItems[currentDate]?.tasks || []), ...completedTasks],
        count: completedTasks.length, // Number of completed items
      },
    };

    // Log the updatedClearedItems object
    console.log("Updated Cleared Items:", updatedClearedItems);

    return updatedClearedItems;
  };

  const saveUserData = (updatedTodos) => {
    console.log("Saving user data...");
    const currentDate = new Date().toLocaleDateString();

    // Check if userData.entries is defined before accessing its properties
    if (userData.entries) {
      const existingEntryIndex = userData.entries.findIndex(
        (entry) => entry.date === currentDate
      );

      if (existingEntryIndex !== -1) {
        const updatedEntries = [...userData.entries];
        updatedEntries[existingEntryIndex].tasks = todos.map(
          (todo) => todo.task
        );

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
    }

    updateLocalStorageData({ todos, entries: userData.entries, clearedItems });
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
          <EditTodoForm
            editTodo={editTask}
            task={todo}
            key={index}
            saveUserData={saveUserData} // Pass saveUserData as a prop
          />
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
          Tasks: {todoCount} <SaveButton saveUserData={saveUserData} />
        </p>
        <p>
          {anyCompletedTodos && (
            <button
              type="submit"
              className="clear-btn"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </p>
      </div>
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
