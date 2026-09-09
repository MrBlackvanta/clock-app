import { dayOfYear, isoWeek, isoWeekday, timeZoneId } from "@/lib";

type DetailPairProps = {
  label: string;
  value: string;
};

function DetailPair({ label, value }: DetailPairProps) {
  return (
    <div className="flex items-center justify-between md:block">
      <dt className="text-detail-label md:text-detail-label-md lg:text-detail-label-lg uppercase">
        {label}
      </dt>
      <dd className="text-detail-value md:text-detail-value-md lg:text-detail-value-lg font-bold lg:mt-2.25">
        {value}
      </dd>
    </div>
  );
}

export default function DetailsPanel({ now }: { now: Date }) {
  return (
    <section className="v-panel-wash v-panel-ink relative shrink-0 py-12 backdrop-blur-2xl md:py-30 lg:py-18.5">
      <h2 className="sr-only">Time zone details</h2>
      <div className="v-panel-rule absolute inset-y-18.5 left-1/2 hidden w-px lg:block" />
      <dl className="v-gutter flex flex-col gap-4 md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-2 md:gap-x-32 md:gap-y-12 lg:gap-x-55 lg:gap-y-10.5">
        <DetailPair label="Current timezone" value={timeZoneId()} />
        <DetailPair label="Day of the year" value={String(dayOfYear(now))} />
        <DetailPair label="Day of the week" value={String(isoWeekday(now))} />
        <DetailPair label="Week number" value={String(isoWeek(now))} />
      </dl>
    </section>
  );
}
