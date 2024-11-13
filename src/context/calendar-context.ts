import * as React from "react";

export interface CalendarContextInterface {
  startTime: string;
  endTime: string;
  hoursList: string[];
}

export const CalendarContext = React.createContext<CalendarContextInterface>(
  {} as CalendarContextInterface
);
