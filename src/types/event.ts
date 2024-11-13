import { TimeSlotType } from "./calendar";

export type EventIdType = number;

export interface EventInputInterface {
  id: EventIdType;
  start: string;
  duration: number;
}

export interface EventInputWithTimeSlotInterface extends EventInputInterface {
  timeSlot: TimeSlotType;
}

export interface EventDetailsInterface {
  duration: EventInputInterface["duration"];
  timeSlot: TimeSlotType;
  overlaps: number;
  position: number;
}
