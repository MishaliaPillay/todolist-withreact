import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getStoredData, updateStoredData } from "./TodoWrapper";
import "./Calendar.css"; // Import CSS for styling

function Calendar() {
  // State to store events
  const [events, setEvents] = useState([]);

  // Fetch stored data on component mount
  useEffect(() => {
    const storedData = getStoredData();
    if (storedData && storedData.todos) {
      const updatedEvents = storedData.todos.map((data) => ({
        title: data.task,
        start: data.date,
      }));
      setEvents(updatedEvents);
    }
  }, []);

  // Function to handle date click event
  const handleDateClick = (arg) => {
    // Prompt user for event title
    const title = prompt("Enter event title:");
    if (title) {
      // Create new event object with clicked date and provided title
      const newEvent = {
        title: title,
        start: arg.date, // Use clicked date
      };

      // Update events state with new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      // Update stored data with the latest state
      updateStoredData((prevData) => [...prevData, newEvent]);
    }
  };

  // Function to handle event drop
  const handleEventDrop = (arg) => {
    // Update event's start date in state
    const updatedEvents = events.map((event) =>
      event === arg.event ? { ...event, start: arg.event.start } : event
    );
    setEvents(updatedEvents);

    // Update stored data with the latest state
    updateStoredData(updatedEvents);
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
