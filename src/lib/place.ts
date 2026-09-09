export type Place = {
  city: string;
  country: string;
};

export function placeLabel({ city, country }: Place) {
  return [city, country].filter(Boolean).join(", ");
}
