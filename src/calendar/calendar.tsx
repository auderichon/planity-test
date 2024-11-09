import React from "react";

import { TimeValues } from "./time-values";
import { EventsList } from "./events-list";

export const START_TIME = "09:00";
export const END_TIME = "21:00";

export const Calendar: React.FC = () => (
  <div className="calendar">
    <TimeValues startTime={START_TIME} endTime={END_TIME} />
    <EventsList />
  </div>
);
