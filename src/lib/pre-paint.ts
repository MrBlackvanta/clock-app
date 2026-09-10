import { ABBREVIATION_LOCALES, greetingFor, periodFor } from "./time";

const BY_LOCAL_HOUR = Array.from({ length: 24 }, (_, hour) => {
  const sample = new Date(2000, 0, 1, hour);
  return [periodFor(sample), greetingFor(sample)];
});

export const prePaintScript = `
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const clock = pad(now.getHours()) + ":" + pad(now.getMinutes());
  const [period, greeting] = ${JSON.stringify(BY_LOCAL_HOUR)}[now.getHours()];

  for (const node of document.querySelectorAll('[data-photo="' + period + '"] [data-src]'))
    node[node.tagName === "IMG" ? "src" : "srcset"] = node.dataset.src;

  let zone = "";
  for (const locale of ${JSON.stringify(ABBREVIATION_LOCALES)}) {
    const named = new Intl.DateTimeFormat(locale, { timeZoneName: "short" })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName");
    if (!named) continue;
    if (!named.value.startsWith("GMT")) {
      zone = named.value;
      break;
    }
    zone ||= named.value;
  }

  const filled = {
    greeting,
    clock,
    zone,
    place: new Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.split("/")
      .at(-1)
      .replace(/_/g, " "),
  };

  for (const node of document.querySelectorAll("[data-fill]"))
    node.textContent = filled[node.dataset.fill];

  document.querySelector("time[data-fill]").dateTime =
    now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + "T" + clock;

  document.documentElement.dataset.period = period;
`;
