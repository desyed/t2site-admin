import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(relativeTime);

/**
 * Formats a date string using dayjs with a specified format.
 *
 * @param time - The date string to format.
 * @param formatStr - The desired format string. Defaults to "YYYY-MM-DD hh:mm A".
 * @returns The formatted date string or a fallback message if the date is invalid.
 */
export const tableTimeFormat = (time: string, formatStr: string = 'YYYY-MM-DD hh:mm A'): string => {
  const date = dayjs(time);

  if (!date.isValid()) {
    // eslint-disable-next-line no-console
    console.error(`Invalid date provided: ${time}`);
    return 'Invalid date';
  }

  return date.format(formatStr);
};

/**
 * Formats a given time as a relative string (e.g. "3 minutes ago") if it is within
 * the maximum allowed age; otherwise, it shows an absolute formatted date.
 *
 * @param time - The ISO date string or any string parsable by dayjs.
 * @param maxRelativeSeconds - The maximum age in seconds to show relative time.
 *  Defaults to 60 * 60 * 24 * 30 seconds (30 days).
 * @returns A formatted time string.
 */
export const tableTimeRelativeFormat = (
  time: string,
  maxRelativeSeconds: number = 60 * 60 * 24 * 30
) => {
  const inputTime = dayjs(time);
  const now = dayjs();

  // Calculate the difference in seconds
  const diffInSeconds = now.diff(inputTime, 'second');

  // If within the max threshold, return the relative time string
  if (diffInSeconds <= maxRelativeSeconds) {
    return inputTime.fromNow();
  } else {
    // Otherwise, return an absolute formatted date.
    return inputTime.format('YYYY-MM-DD HH:mm');
  }
};

export const dayJs = dayjs;
