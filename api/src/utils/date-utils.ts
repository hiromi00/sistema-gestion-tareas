import { DateTime } from 'luxon';
export const getCurrentDate = () => {
  return DateTime.local({ zone: 'America/Mexico_City' });
};

export const convertSecondsToDateTime = (seconds: number) => {
  const datetime = DateTime.fromSeconds(seconds, { zone: 'America/Mexico_City' });
  return datetime;
};
