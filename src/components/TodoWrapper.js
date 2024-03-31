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
  const [clearedItems, setClearedItems] = useState({});
  // Call the function to get the stored data
  const storedData = getLocalStorageData();

  // Log the stored data to the console
  console.log("Storedddddd Data:", storedData);
  useEffect(() => {
    const storedData = getLocalStorageData();
    if (storedData && storedData.todos) {
      setUserData(storedData);
      setTodos(storedData.todos);
      setClearedItems(storedData.clearedItems || {}); // Set cleared items from local storage if available
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
  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      console.log("Updated Todos:", updatedTodos); // Log updated todos
      saveUserData(updatedTodos); // Call saveUserData after updating state
      updateStoredData({ todos: updatedTodos, entries: userData.entries }); // Update local storage data
      return updatedTodos;
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      updateStoredData({ todos: updatedTodos, entries: userData.entries }); // Update local storage immediately
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
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    console.log(todos);
    updateLocalStorageData({ todos, entries: userData.entries });
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

    updateLocalStorageData({ todos, entries: userData.entries });
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
