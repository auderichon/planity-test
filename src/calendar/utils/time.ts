import { EventInputInterface, TimeSlotType } from "../../types";

export const getTimeStringInMinutes = (time: string): number => {
  const hoursMinutesArray = time.split(":");
  if (hoursMinutesArray.length !== 2) {
    return 0;
  }

  const hours = Number(hoursMinutesArray[0]);
  const minutes = Number(hoursMinutesArray[1]);
  return isNaN(hours) || isNaN(minutes) ? 0 : hours * 60 + minutes;
};

// NB: this function only works for same day start and end times
export const getDurationInMinutes = ({
  startTime,
  endTime,
  allowNegativeDuration = false,
}: {
  startTime: string;
  endTime: string;
  allowNegativeDuration?: boolean;
}) => {
  const duration =
    getTimeStringInMinutes(endTime) - getTimeStringInMinutes(startTime);
  return duration >= 0 || allowNegativeDuration ? duration : 0;
};

// NB: this function only works for same day event and start time
export const getEventTimeSlot = (
  event: EventInputInterface,
  startTime: string
): TimeSlotType => {
  const startTimePosition = getDurationInMinutes({
    startTime,
    endTime: event.start,
    allowNegativeDuration: true,
  });
  return [startTimePosition, startTimePosition + event.duration];
};
