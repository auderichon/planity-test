import React from "react";

import { Event } from "./event";
import events from "../data/input.json";
import "../styles/calendar.css";

export const EventsList: React.FC = () => {
  return (
    <div className="eventsList">
      <div className="eventsContainer">
        {events.map((event) => (
          <Event key={event.id} event={event} color="yellow" />
        ))}
      </div>
    </div>
  );
};
