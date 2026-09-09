import { MoonIcon, SunIcon } from "@/components/icons";
import {
  greetingFor,
  hoursAndMinutes,
  isoLocalMinute,
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

  return (
    <div className="pending:invisible flex flex-col gap-4 md:gap-0 lg:gap-4">
      <p className="text-greeting md:text-greeting-md lg:text-greeting-lg flex items-center gap-4 uppercase">
        <SunIcon className="night:hidden size-6 shrink-0" />
        <MoonIcon className="night:block hidden size-6 shrink-0" />
        <span>
          <span data-fill="greeting" suppressHydrationWarning>
            {greetingFor(moment)}
          </span>
          <span className="hidden md:inline">, it’s currently</span>
        </span>
      </p>
      <p className="flex flex-wrap items-baseline gap-2 md:gap-4">
        <time
          data-fill="clock"
          dateTime={isoLocalMinute(moment)}
          className="text-clock md:text-clock-md lg:text-clock-lg font-bold tabular-nums"
          suppressHydrationWarning
        >
          {hoursAndMinutes(moment)}
        </time>
        <span
          data-fill="zone"
          className="text-zone md:text-zone-md lg:text-zone-lg font-light"
          suppressHydrationWarning
        >
          {now ? zoneAbbreviation(now) : SAMPLE_ZONE}
        </span>
      </p>
      <p className="text-place md:text-place-md lg:text-place-lg font-bold uppercase">
        In{" "}
        <span data-fill="place" suppressHydrationWarning>
          {now ? placeFor(located) : SAMPLE_PLACE}
        </span>
      </p>
    </div>
  );
}
