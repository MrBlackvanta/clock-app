import { periodFor, type Period } from "@/lib";
import { useEffect } from "react";

function loadPhoto(period: Period) {
  const layer = document.querySelector(`[data-photo="${period}"]`);
  if (!layer) return null;

  for (const source of layer.querySelectorAll("source"))
    source.srcset = source.dataset.src ?? "";

  const image = layer.querySelector("img");
  if (image) image.src = image.dataset.src ?? "";

  return image;
}

export function usePeriod(now: Date | null) {
  useEffect(() => {
    if (!now) return;

    const root = document.documentElement;
    const period = periodFor(now);
    if (root.dataset.period === period) return;

    const reveal = async () => {
      const image = loadPhoto(period);
      if (image) await image.decode().catch(() => {});
      root.dataset.period = period;
    };

    void reveal();
  }, [now]);
}
