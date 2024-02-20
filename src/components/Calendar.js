import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import TodoForm from "./TodoForm"; // Import TodoForm here

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTask = (task) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    const updatedTasks = { ...tasks };
    if (!updatedTasks[dateKey]) {
      updatedTasks[dateKey] = [];
    }
    updatedTasks[dateKey].push(task);
    setTasks(updatedTasks);
  };

  const deleteTask = (dateKey, index) => {
    const updatedTasks = { ...tasks };
    updatedTasks[dateKey].splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Organize More Days</h1>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />

      <FontAwesomeIcon icon={faCalendarDays} />
      <div>
        <h2>Tasks for {selectedDate.toDateString()}</h2>

        <TodoForm addTodo={addTask} />
      </div>
    </div>
  );
};

export default Calendar;
