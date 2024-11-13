import {
  getDurationInMinutes,
  getEventTimeSlot,
  getTimeStringInMinutes,
} from "../time";

describe("time utils", () => {
  describe("getTimeStringInMinutes", () => {
    test("should return a number of minutes for valid time input", () => {
      const minutes = getTimeStringInMinutes("14:50");

      expect(typeof minutes).toBe("number");
      expect(minutes).toEqual(890);
    });

    test("should return 0 for invalid time format", () => {
      const error = getTimeStringInMinutes("error");

      expect(typeof error).toBe("number");
      expect(error).toEqual(0);
    });

    test("should handle edge case for midnight", () => {
      const error = getTimeStringInMinutes("00:00");

      expect(error).toEqual(0);
    });
  });

  describe("getDurationInMinutes", () => {
    test("should return duration in minutes between start and end times", () => {
      const duration = getDurationInMinutes({
        startTime: "14:50",
        endTime: "17:28",
      });

      expect(typeof duration).toBe("number");
      expect(duration).toEqual(158);
    });

    test("should return 0 if endTime is before startTime", () => {
      const duration = getDurationInMinutes({
        startTime: "17:28",
        endTime: "14:50",
      });
      expect(duration).toEqual(0);
    });

    test("should return 0 if startTime equals endTime", () => {
      const duration = getDurationInMinutes({
        startTime: "14:50",
        endTime: "14:50",
      });
      expect(duration).toEqual(0);
    });
  });

  describe("getEventTimeSlot", () => {
    const event = {
      id: 1,
      start: "10:45",
      duration: 60,
    };

    test("should return an array of numbers representing the event's time slot", () => {
      const startTime = "9:00";

      const timeSlot = getEventTimeSlot(event, startTime);

      expect(typeof timeSlot).toBe("object");
      expect(typeof timeSlot[0]).toBe("number");
      expect(typeof timeSlot[1]).toBe("number");
      expect(timeSlot).toEqual([105, 165]);
    });

    test("should handle case where event start time is before provided start time", () => {
      const startTime = "12:00";

      const timeSlot = getEventTimeSlot(event, startTime);
      expect(timeSlot).toEqual([-75, -15]);
    });
  });
});
