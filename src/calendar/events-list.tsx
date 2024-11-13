import React from "react";

import { Event } from "./event";
import {
  getDurationInMinutes,
  getEventTimeSlot,
  getOverlappingEventsByEventId,
  getPositionByEventId,
} from "./utils";
import {
  EventDetailsInterface,
  EventIdType,
  EventInputWithTimeSlotInterface,
} from "../types";
import { CalendarContext, CalendarContextInterface } from "../context";

import events from "../data/input.json";
import "../styles/events-list.css";

const EVENT_COLORS = ["#f3c1d3", "#a8d8e6", "#c3b7e1", "#fff6a0", "#ff9a8b"];

export const EventsList: React.FC = () => {
  const { startTime, endTime } = React.useContext(
    CalendarContext
  ) as CalendarContextInterface;

  const dailyMinutes = getDurationInMinutes({
    startTime,
    endTime,
  });

  // calculate timeSlots and order events by timeSlots starting time
  const orderedEventsWithTimeSlots: EventInputWithTimeSlotInterface[] = events
    .map((event) => ({
      ...event,
      timeSlot: getEventTimeSlot(event, startTime),
    }))
    .sort((event1, event2) => event1.timeSlot[0] - event2.timeSlot[0]);

  // list overlapping events
  const overlappingEventsById = getOverlappingEventsByEventId(
    orderedEventsWithTimeSlots
  );

  // get display positions
  const positions = getPositionByEventId(
    orderedEventsWithTimeSlots,
    overlappingEventsById
  );

  const sortedEventsMap = orderedEventsWithTimeSlots.reduce(
    (map, { id, timeSlot, duration }) => {
      map.set(id, {
        timeSlot,
        duration,
        overlaps: overlappingEventsById[id],
        position: positions[id],
      });
      return map;
    },
    new Map<EventIdType, EventDetailsInterface>()
  );

  return (
    <div className="eventsList">
      <div className="eventsContainer">
        {Array.from(sortedEventsMap.entries()).map(([key, value]) => (
          <Event
            key={key}
            id={key}
            event={value}
            dailyMinutes={dailyMinutes}
            color={EVENT_COLORS[key % EVENT_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
};
