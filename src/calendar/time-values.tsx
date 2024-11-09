import React from "react";
import { padStart } from "lodash";

import "../styles/calendar.css";

interface TimeValuesInterface {
  startTime: string;
  endTime: string;
}

const getHoursList = (startTime: string, endTime: string): string[] => {
  const hoursList = [startTime];
  // for simplicity we consider only round times
  const lastHour = Number(endTime.slice(0, 2));
  let nextHourSlot = Number(startTime.slice(0, 2));
  while (nextHourSlot < lastHour) {
    nextHourSlot++;
    hoursList.push(padStart(nextHourSlot.toString(), 2, "0") + ":00");
  }
  return hoursList;
};

export const TimeValues: React.FC<TimeValuesInterface> = ({
  startTime,
  endTime,
}) => {
  const hoursList = getHoursList(startTime, endTime);

  return (
    <ul className="hoursList">
      {hoursList.map((hour) => (
        <li key={hour}>{hour}</li>
      ))}
    </ul>
  );
};
