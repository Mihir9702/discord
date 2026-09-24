import { Message } from "src/types/query";

// "3:07 PM" in the viewer's own timezone
export function formatTime(date: string) {
  const dateObj = new Date(Number(date));
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  const hourStr = hour % 12 === 0 ? "12" : String(hour % 12);
  const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${hourStr}:${minuteStr} ${ampm}`;
}

export function formatDate(date: string) {
  const dateObj = new Date(Number(date));
  const today = new Date();
  const time = formatTime(date);

  if (isSameDate(dateObj, today)) return `Today at ${time}`;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(dateObj, yesterday)) return `Yesterday at ${time}`;

  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;

  return `${monthStr}/${dayStr}/${dateObj.getFullYear()} ${time}`;
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
  const dates = messages.map((message) => {
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

// discord groups messages from the same person sent within a few minutes
export function isContinuation(prev: Message | undefined, msg: Message) {
  if (!prev || prev.user?.id !== msg.user?.id) return false;
  return Number(msg.createdAt) - Number(prev.createdAt) < 7 * 60 * 1000;
}
