import { ChevronIcon } from "@/components/icons";

type TogglePillProps = {
  expanded: boolean;
  onToggle: () => void;
};

export default function TogglePill({ expanded, onToggle }: TogglePillProps) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls="time-zone-details"
      onClick={onToggle}
      className="v-focus-ring group flex w-28.75 shrink-0 items-center justify-end gap-3 rounded-full bg-white p-1 transition motion-safe:active:scale-95 md:w-36.5 md:gap-2 md:p-2"
    >
      <span className="text-toggle md:text-toggle-md text-muted group-hover:text-ink font-bold uppercase transition-colors">
        {expanded ? "Less" : "More"}
      </span>
      <span className="bg-ink flex size-8 items-center justify-center rounded-full md:size-10">
        <ChevronIcon className="v-reveal expanded:rotate-180 w-2.75 text-white md:w-3.5" />
      </span>
    </button>
  );
}
