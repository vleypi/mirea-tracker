export const DAY_MS = 86_400_000;

export const startOfToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const parseMonthOrDay = (value: string): { end: Date; hasDay: boolean } => {
  const [year, month, day] = value.split("-").map(Number);
  return day ? { end: new Date(year, month - 1, day), hasDay: true } : { end: new Date(year, month, 0), hasDay: false };
};

const padTwoDigits = (value: number): string => String(value).padStart(2, "0");

export const toDateInputValue = (date: Date): string =>
  `${date.getFullYear()}-${padTwoDigits(date.getMonth() + 1)}-${padTwoDigits(date.getDate())}`;
