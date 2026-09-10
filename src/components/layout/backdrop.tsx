import dayDesktop from "@/assets/bg-daytime-desktop.webp";
import dayMobile from "@/assets/bg-daytime-mobile.webp";
import dayTablet from "@/assets/bg-daytime-tablet.webp";
import nightDesktop from "@/assets/bg-nighttime-desktop.webp";
import nightMobile from "@/assets/bg-nighttime-mobile.webp";
import nightTablet from "@/assets/bg-nighttime-tablet.webp";
import type { Period } from "@/lib";

const TABLET_UP = "(min-width: 48rem)";
const DESKTOP_UP = "(min-width: 90rem)";

const CROPS = {
  day: { mobile: dayMobile, tablet: dayTablet, desktop: dayDesktop },
  night: { mobile: nightMobile, tablet: nightTablet, desktop: nightDesktop },
};

function Photo({ period }: { period: Period }) {
  const crop = CROPS[period];

  return (
    <picture data-photo={period} className="contents">
      <source
        media={DESKTOP_UP}
        data-src={crop.desktop.src}
        suppressHydrationWarning
      />
      <source
        media={TABLET_UP}
        data-src={crop.tablet.src}
        suppressHydrationWarning
      />
      <img
        data-src={crop.mobile.src}
        alt=""
        fetchPriority="high"
        className="v-photo pointer-events-none absolute inset-0 -z-10 size-full object-cover"
        suppressHydrationWarning
      />
    </picture>
  );
}

export default function Backdrop() {
  return (
    <>
      <Photo period="day" />
      <Photo period="night" />
      <div className="v-scrim pointer-events-none absolute inset-0 -z-10" />
    </>
  );
}
