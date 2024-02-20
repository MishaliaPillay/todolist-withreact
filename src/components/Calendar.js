import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getStoredData } from "./TodoWrapper";

function Calendar() {
  // State to store events
  const [events, setEvents] = useState([]);

  // Fetch stored data on component mount
  useEffect(() => {
    const storedData = getStoredData();
    console.log(storedData);
    if (storedData && storedData.todos) {
      const updatedEvents = storedData.todos.flatMap((entry) =>
        entry.tasks.map((task) => ({
          title: task,
          start: entry.date, // Assuming each entry has a 'date' property
          // You can add more properties like end, etc. if needed
        }))
      );
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
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="calendar">
      <h1>Calendar Page</h1>
      {/* Render the FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events} // Pass the events state to the FullCalendar component
        dateClick={handleDateClick} // Handle date click event
      />
    </div>
  );
}

export default Calendar;
