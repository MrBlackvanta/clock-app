export const NIGHT_HOUR = 18;

type Period = "day" | "night";

export const ABBREVIATION_LOCALES = ["en-GB", "en-US"];
const DAY = 86_400_000;

const pad = (value: number) => String(value).padStart(2, "0");

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function periodFor(date: Date): Period {
  return date.getHours() >= NIGHT_HOUR ? "night" : "day";
}

export function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < NIGHT_HOUR) return "Good afternoon";
  return "Good evening";
}

export function hoursAndMinutes(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function isoLocalMinute(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${hoursAndMinutes(date)}`;
}

export function zoneAbbreviation(date: Date) {
  let offsetForm = "";
  for (const locale of ABBREVIATION_LOCALES) {
    const zoneName = new Intl.DateTimeFormat(locale, { timeZoneName: "short" })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value;
    if (!zoneName) continue;
    if (!zoneName.startsWith("GMT")) return zoneName;
    offsetForm ||= zoneName;
  }
  return offsetForm;
}

export function timeZoneId() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function cityOf(timeZone: string) {
  return timeZone.split("/").at(-1)?.replace(/_/g, " ") ?? timeZone;
}

export function dayOfYear(date: Date) {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return (
    Math.round((startOfDay(date).getTime() - yearStart.getTime()) / DAY) + 1
  );
}

export function isoWeekday(date: Date) {
  return ((date.getDay() + 6) % 7) + 1;
}

export function isoWeek(date: Date) {
  const thursday = startOfDay(date);
  thursday.setDate(thursday.getDate() - isoWeekday(date) + 4);

  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(
    firstThursday.getDate() - isoWeekday(firstThursday) + 4,
  );

  return (
    Math.round((thursday.getTime() - firstThursday.getTime()) / (7 * DAY)) + 1
  );
}
