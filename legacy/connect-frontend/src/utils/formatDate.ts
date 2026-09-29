import { Message } from "src/types/query";

export function formatDate(date: string) {
  const dateObj = new Date(Number(date));

  // Get the timezone offset in minutes (240 for EST)
  const timezoneOffset = dateObj.getTimezoneOffset() - 240;

  // Adjust the date by adding the timezone offset in minutes
  dateObj.setMinutes(dateObj.getMinutes() + timezoneOffset);

  // Create a new Date object for the current date and time
  const today = new Date(Date.now() + timezoneOffset * 60 * 1000); // Adjust the current date with the timezone offset

  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  const hourStr = hour % 12 === 0 ? "12" : String(hour % 12);
  const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;

  if (isSameDate(dateObj, today)) {
    const todayHour = today.getHours();
    const todayMinute = today.getMinutes();
    const todayHourStr = todayHour % 12 === 0 ? "12" : String(todayHour % 12);
    const todayMinuteStr =
      todayMinute < 10 ? `0${todayMinute}` : `${todayMinute}`;
    const todayAmpm = todayHour >= 12 ? "PM" : "AM";
    return `Today at ${todayHourStr}:${todayMinuteStr} ${todayAmpm}`;
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(dateObj, yesterday)) {
    return `Yesterday at ${hourStr}:${minuteStr} ${ampm}`;
  }

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  if (isSameDate(dateObj, twoDaysAgo)) {
    return `${monthStr}/${dayStr}/${year} at ${hourStr}:${minuteStr} ${ampm}`;
  }

  return `${monthStr}/${dayStr}/${year} ${hourStr}:${minuteStr} ${ampm}`;
}

// Helper function to check if two dates are the same
function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function uniqueDates(messages: Message[]): string[] {
  // if messages is empty, return empty array
  if (messages.length === 0) return [];

  // loop through messages
  const dates = messages.map((message, i) => {
    return new Date(Number(message.createdAt)).toLocaleDateString();
  });

  // remove dups
  const uniqueDatesofMessages = dates.filter(
    (date, i) => dates.indexOf(date) === i
  );

  return uniqueDatesofMessages;
}

export function getMessagesFromSameDate(messages: Message[], date: string) {
  if (messages.length === 0) return [];

  return messages.filter((message) => {
    return new Date(Number(message.createdAt)).toLocaleDateString() === date;
  });
}
