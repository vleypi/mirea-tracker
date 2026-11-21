import { DAY_MS } from "@/shared/lib/date.util";

const LOCALE = "ru-RU";

const DAY_FORMAT = new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long" });
const MONTH_FORMAT = new Intl.DateTimeFormat(LOCALE, { month: "long" });
const RELATIVE_FORMAT = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });
const NUMBER_FORMAT = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });
const PRECISE_NUMBER_FORMAT = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 2 });
const PLURAL_RULES = new Intl.PluralRules(LOCALE);

export interface IPluralForms {
  one: string;
  few: string;
  many: string;
}

export const formatDay = (date: Date): string => DAY_FORMAT.format(date);

export const formatMonth = (date: Date): string => MONTH_FORMAT.format(date);

export const formatNumber = (value: number): string => NUMBER_FORMAT.format(value);

export const formatPreciseNumber = (value: number): string => PRECISE_NUMBER_FORMAT.format(value);

export const formatDaysFromNow = (date: Date, today: Date): string =>
  RELATIVE_FORMAT.format(Math.round((date.getTime() - today.getTime()) / DAY_MS), "day");

export const pluralize = (count: number, forms: IPluralForms): string => {
  const rule = PLURAL_RULES.select(count);
  return rule === "one" || rule === "few" ? forms[rule] : forms.many;
};
