import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getStoredData, updateStoredData } from "./TodoWrapper";
import "./Calendar.css"; // Import CSS for styling

function Calendar() {
  // State to store events and todos
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  // Fetch stored data on component mount
  useEffect(() => {
    const storedData = getStoredData();
    if (storedData && storedData.todos) {
      const updatedEvents = storedData.todos.map((data) => ({
        title: data.task,
        date: data.date,
        id: data.id,
      }));
      console.log("tesrt", updatedEvents);
      setEvents(updatedEvents);
      setTodos(storedData.todos);
    }
  }, []);
  // Function to handle date click event
  const handleDateClick = (arg) => {
    // Prompt user for event title
    const title = prompt("Enter event title:");
    if (title) {
      // Generate unique ID for the todo item
      const id = generateUniqueId();

      // Create new event object with clicked date, provided title, and ID
      const newEvent = {
        title: title,
        start: arg.date, // Use clicked date
        id: id, // Use generated unique ID
      };

      // Update events state with new event using the functional form of setEvents
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      // Update stored data with the latest state including both events and todos
      updateStoredData({
        todos: [...todos, { task: title, date: arg.date, id: id }],
        events: [...events, newEvent],
      });
    }
  };

  // Function to generate unique IDs
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random string
  };

  // Function to handle event drop
  const handleEventDrop = (arg) => {
    // Find the corresponding todo item and update its date
    const updatedTodos = todos.map((todo) =>
      todo.id === arg.event.id ? { ...todo, date: arg.event.start } : todo
    );

    // Update events state with the updated start date of the dropped event
    const updatedEvents = events.map((event) =>
      event.id === arg.event.id ? { ...event, start: arg.event.start } : event
    );

    // Update events state with the updated events
    setEvents(updatedEvents);

    // Update todos state with the updated todos
    setTodos(updatedTodos);

    // Update stored data with the updated todos and events
    updateStoredData({
      todos: updatedTodos,
      events: updatedEvents,
    });
  };

  return (
    <div className="calendar-container">
      <h1>Calendar Page</h1>
      {/* Render the FullCalendar component */}
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events} // Pass the events state to the FullCalendar component
          dateClick={handleDateClick} // Handle date click event
          eventDrop={handleEventDrop} // Handle event drop event
          editable={true} // Enable event dragging
        />
      </div>
    </div>
  );
}

export default Calendar;
