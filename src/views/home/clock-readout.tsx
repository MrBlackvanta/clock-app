import { MoonIcon, SunIcon } from "@/components/icons";
import {
  greetingFor,
  hoursAndMinutes,
  isoLocalMinute,
  periodFor,
  placeFor,
  zoneAbbreviation,
} from "@/lib";
import { usePlace } from "./use-place";

const SAMPLE_MOMENT = new Date(2021, 9, 22, 11, 37);
const SAMPLE_ZONE = "BST";
const SAMPLE_PLACE = "London";

export default function ClockReadout({ now }: { now: Date | null }) {
  const located = usePlace();
  const moment = now ?? SAMPLE_MOMENT;
  const Icon = periodFor(moment) === "night" ? MoonIcon : SunIcon;

  return (
    <div className="pending:invisible flex flex-col gap-4 md:gap-0 lg:gap-4">
      <p className="text-greeting md:text-greeting-md lg:text-greeting-lg flex items-center gap-4 uppercase">
        <Icon className="size-6 shrink-0" />
        <span>
          {greetingFor(moment)}
          <span className="hidden md:inline">, it’s currently</span>
        </span>
      </p>
      <p className="flex flex-wrap items-baseline gap-2 md:gap-4">
        <time
          dateTime={isoLocalMinute(moment)}
          className="text-clock md:text-clock-md lg:text-clock-lg font-bold tabular-nums"
        >
          {hoursAndMinutes(moment)}
        </time>
        <span className="text-zone md:text-zone-md lg:text-zone-lg font-light">
          {now ? zoneAbbreviation(now) : SAMPLE_ZONE}
        </span>
      </p>
      <p className="text-place md:text-place-md lg:text-place-lg font-bold uppercase">
        In {now ? placeFor(located) : SAMPLE_PLACE}
      </p>
    </div>
  );
}
