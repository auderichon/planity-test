import {
  EventIdType,
  EventInputWithTimeSlotInterface,
  TimeSlotType,
} from "../../types";

export const isOverlappingOn = (
  interval1: TimeSlotType,
  interval2: TimeSlotType
): [number, number] => [
  Math.max(interval1[0], interval2[0]),
  Math.min(interval1[1], interval2[1]),
];

export const getOverlappingEventsByEventId = (
  orderedEvents: EventInputWithTimeSlotInterface[]
): Record<EventIdType, { id: EventIdType; on: TimeSlotType }[]> =>
  orderedEvents.reduce((events, { id, timeSlot }, i) => {
    if (!events[id]) {
      events[id] = [];
    }

    let index = i;
    while (
      index < orderedEvents.length - 1 &&
      orderedEvents[index + 1].timeSlot[0] < timeSlot[1]
    ) {
      const overlappingTimeSlot = isOverlappingOn(
        timeSlot,
        orderedEvents[index + 1].timeSlot
      );
      events[id].push({
        id: orderedEvents[index + 1].id,
        on: overlappingTimeSlot,
      });

      const nextEventId = orderedEvents[index + 1].id;
      const newOverlap = {
        id,
        on: overlappingTimeSlot,
      };
      if (!events[nextEventId]) {
        events[nextEventId] = [newOverlap];
      } else {
        events[nextEventId].push(newOverlap);
      }
      index++;
    }
    return events;
  }, {} as Record<EventIdType, { id: EventIdType; on: TimeSlotType }[]>);

export const getPositionByEventId = (
  orderedEvents: EventInputWithTimeSlotInterface[],
  overlappingEvents: Record<
    EventIdType,
    { id: EventIdType; on: TimeSlotType }[]
  >
): Record<EventIdType, number> =>
  orderedEvents.reduce((positions, { id }) => {
    if (!overlappingEvents[id].length) {
      positions[id] = 1;
      return positions;
    }

    // check which position has already been attributed for overlapping events
    const takenPositions: number[] = [];
    overlappingEvents[id].forEach((event) => {
      if (!!positions[event.id]) {
        takenPositions.push(positions[event.id]);
      }
    });

    let position = 1;
    while (takenPositions.includes(position)) {
      position++;
    }
    positions[id] = position;
    return positions;
  }, {} as Record<EventIdType, number>);

export const getMaxOverlappingEvents = (
  overlapsIntervals: TimeSlotType[]
): number => {
  const eventTimeBoundaries = overlapsIntervals.reduce(
    (boundaries, [start, end]) => {
      boundaries.push([start, "start"]);
      boundaries.push([end, "end"]);
      return boundaries;
    },
    [] as [number, "start" | "end"][]
  );

  // sort events by time (with "end" time being before "start" time if similar)
  eventTimeBoundaries.sort(
    (a, b) => a[0] - b[0] || (a[1] === "start" ? 1 : -1)
  );

  // iterate through events and track active intervals
  let maxOverlaps = 0;
  let currentOverlaps = 0;

  eventTimeBoundaries.forEach(([, type]) => {
    if (type === "start") {
      currentOverlaps += 1;
      maxOverlaps = Math.max(maxOverlaps, currentOverlaps);
    } else {
      currentOverlaps -= 1;
    }
  });

  // include current event in overlap
  return maxOverlaps + 1;
};

export const getMaxOverlappingEventsByEventId = (
  overlappingEvents: Record<
    EventIdType,
    { id: EventIdType; on: TimeSlotType }[]
  >
): Record<EventIdType, number> => {
  //get max overlaps by event id
  const maxOverlapsByEventId = {} as Record<EventIdType, number>;

  for (const [eventId, overlaps] of Object.entries(overlappingEvents)) {
    maxOverlapsByEventId[Number(eventId)] = getMaxOverlappingEvents(
      overlaps.map((o) => o.on)
    );
  }

  //get max overlaps of overlapping events
  const maxOverlappingEvents = {} as Record<EventIdType, number>;

  for (const [eventId, overlaps] of Object.entries(overlappingEvents)) {
    const maxOverlapsList = overlaps.map((o) => maxOverlapsByEventId[o.id]);

    maxOverlappingEvents[Number(eventId)] = Math.max(...maxOverlapsList, 1);
  }

  return maxOverlappingEvents;
};
