import { EventInputInterface, TimeSlotType } from "../../types";

export const getTimeStringInMinutes = (time: string): number => {
  const hoursMinutesArray = time.split(":");
  const hours = Number(hoursMinutesArray[0]);
  const minutes = Number(hoursMinutesArray[1]);
  return hours * 60 + minutes;
};

export const getDurationInMinutes = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => getTimeStringInMinutes(endTime) - getTimeStringInMinutes(startTime);

export const getEventTimeSlot = (
  event: EventInputInterface,
  startTime: string
): TimeSlotType => {
  const startTimePosition = getDurationInMinutes({
    startTime,
    endTime: event.start,
  });
  return [startTimePosition, startTimePosition + event.duration];
};
