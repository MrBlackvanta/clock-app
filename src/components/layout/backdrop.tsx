import dayDesktop from "@/assets/bg-daytime-desktop.webp";
import dayMobile from "@/assets/bg-daytime-mobile.webp";
import dayTablet from "@/assets/bg-daytime-tablet.webp";
import nightDesktop from "@/assets/bg-nighttime-desktop.webp";
import nightMobile from "@/assets/bg-nighttime-mobile.webp";
import nightTablet from "@/assets/bg-nighttime-tablet.webp";

const TABLET_UP = "(min-width: 48rem)";
const DESKTOP_UP = "(min-width: 90rem)";

export default function Backdrop() {
  return (
    <>
      <picture className="contents">
        <source
          media={DESKTOP_UP}
          data-day={dayDesktop.src}
          data-night={nightDesktop.src}
          suppressHydrationWarning
        />
        <source
          media={TABLET_UP}
          data-day={dayTablet.src}
          data-night={nightTablet.src}
          suppressHydrationWarning
        />
        <img
          data-day={dayMobile.src}
          data-night={nightMobile.src}
          alt=""
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
          suppressHydrationWarning
        />
      </picture>
      <div className="v-scrim pointer-events-none absolute inset-0 -z-10" />
    </>
  );
}
