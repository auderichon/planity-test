import React from "react";

import { CalendarContext, CalendarContextInterface } from "../context";

import "../styles/time-range.css";

export const TimeRange: React.FC = () => {
  const { hoursList } = React.useContext(
    CalendarContext
  ) as CalendarContextInterface;

  return (
    <ul className="timeRange">
      {hoursList.map((hour) => (
        <li key={hour}>{hour}</li>
      ))}
    </ul>
  );
};
