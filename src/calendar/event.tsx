import React from "react";
import "../styles/event.css";
import { END_TIME, START_TIME } from "./calendar";
import { getDurationInMinutes } from "../utils/time";

interface EventInterface {
  event: {
    id: number;
    start: string;
    duration: number;
  };
  color: string;
}

export const Event: React.FC<EventInterface> = ({ event, color }) => {
  const totalDuration = getDurationInMinutes({
    startTime: START_TIME,
    endTime: END_TIME,
  });
  const startTimePosition = getDurationInMinutes({
    startTime: START_TIME,
    endTime: event.start,
  });
  console.log("id", event.id, "startTimePosition", startTimePosition);
  return (
    <div
      className="event"
      style={{
        backgroundColor: color,
        height: `${(event.duration / totalDuration) * 100}%`,
        top: `${(startTimePosition / totalDuration) * 100}%`,
        width: "100%",
      }}
    >
      {event.id}
    </div>
  );
};
