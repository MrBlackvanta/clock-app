import { cityOf, timeZoneId } from "./time";

export type Place = {
  city: string;
  country: string;
};

export function placeLabel({ city, country }: Place) {
  return [city, country].filter(Boolean).join(", ");
}

export function placeFor(located: Place | null) {
  return located ? placeLabel(located) : cityOf(timeZoneId());
}
