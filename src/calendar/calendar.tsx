import React from "react";

import { TimeRange } from "./time-range";
import { EventsList } from "./events-list";
import { CalendarContext } from "../context";
import { padStart } from "lodash";

import "../styles/calendar.css";

const START_TIME = "09:00";
const END_TIME = "21:00";

// NB: for simplicity we consider that only round times will be used as input
const getHoursList = (startTime: string, endTime: string): string[] => {
  const hoursList = [startTime];
  const lastHour = Number(endTime.slice(0, 2));
  let nextHour = Number(startTime.slice(0, 2));
  while (nextHour < lastHour) {
    nextHour++;
    hoursList.push(padStart(nextHour.toString(), 2, "0") + ":00");
  }
  return hoursList;
};

export const Calendar: React.FC = () => {
  const hoursList = getHoursList(START_TIME, END_TIME);
  return (
    <CalendarContext.Provider
      value={{ startTime: START_TIME, endTime: END_TIME, hoursList }}
    >
      <div className="calendar">
        <TimeRange />
        <EventsList />
      </div>
    </CalendarContext.Provider>
  );
};
