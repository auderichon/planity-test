import React from "react";

import { EventDetailsInterface, EventIdType } from "../types";

import "../styles/event.css";

interface EventInterface {
  id: EventIdType;
  event: EventDetailsInterface;
  dailyMinutes: number;
  color: string;
  containerHeight: number;
}

export const Event: React.FC<EventInterface> = ({
  id,
  event,
  dailyMinutes,
  color,
  containerHeight,
}) => {
  const { duration, timeSlot, overlaps, position } = event;
  const width = `calc((100% - ${
    overlaps - 1
  } * var(--standard-space))/${overlaps})`;

  return (
    <div
      className="event"
      style={{
        backgroundColor: color,
        height: `${(duration / dailyMinutes) * containerHeight}px`,
        marginTop: `${(timeSlot[0] / dailyMinutes) * containerHeight}px`,
        width,
        left: `calc((${width} + var(--standard-space)) * ${position - 1})`,
      }}
    >
      {id}
    </div>
  );
};
