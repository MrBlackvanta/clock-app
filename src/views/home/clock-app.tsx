"use client";

import { periodFor } from "@/lib";
import { useEffect, useState } from "react";
import ClockReadout from "./clock-readout";
import DetailsPanel from "./details-panel";
import QuoteCard from "./quote-card";
import TogglePill from "./toggle-pill";
import { useNow } from "./use-now";

export default function ClockApp() {
  const [expanded, setExpanded] = useState(false);
  const now = useNow();

  useEffect(() => {
    if (now) document.documentElement.dataset.period = periodFor(now);
  }, [now]);

  return (
    <main
      data-expanded={expanded || undefined}
      className="grid min-h-dvh grid-rows-[1fr_auto]"
    >
      <h1 className="sr-only">The time where you are</h1>
      <div className="v-reveal lg:expanded:pb-14 md-short:pt-8 md-short:pb-10 flex flex-col justify-end pt-8 pb-10 md:pt-20 md:pb-16 lg:pt-14 lg:pb-24.5">
        <div
          aria-hidden={expanded || undefined}
          inert={expanded || undefined}
          className="v-reveal v-wipe expanded:grid-rows-[0fr] mb-auto grid grid-rows-[1fr]"
        >
          {now && <QuoteCard />}
        </div>
        <div className="v-gutter flex flex-col gap-12 md:gap-20 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <ClockReadout now={now} />
          <TogglePill
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        </div>
      </div>
      <div
        id="time-zone-details"
        aria-hidden={!expanded || undefined}
        className="v-reveal expanded:grid-rows-[1fr] grid grid-rows-[0fr] content-end overflow-hidden"
      >
        <div className="flex min-h-0 flex-col justify-end">
          {now && <DetailsPanel now={now} />}
        </div>
      </div>
    </main>
  );
}
