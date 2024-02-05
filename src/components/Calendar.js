import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <h1>Organise More Days</h1>{" "}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <FontAwesomeIcon icon={faCalendarDays} />
    </div>
  );
};

export default Calendar;
