import { RefreshIcon } from "@/components/icons";
import { quotes } from "@/data";
import { Fragment, useEffect, useState, type CSSProperties } from "react";

const DWELL = 10_000;

function randomIndex() {
  return Math.floor(Math.random() * quotes.length);
}

function anotherIndex(current: number) {
  return (
    (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) %
    quotes.length
  );
}

function nextQuote(current: number) {
  return { index: anotherIndex(current), write: true };
}

function pacedWords(text: string) {
  let offset = 0;

  return text.split(" ").map((word) => {
    const startsAt = offset;
    offset += word.length + 1;

    return { word, startsAt };
  });
}

function writeFrom(character: number) {
  return { "--v-char": character } as CSSProperties;
}

export default function QuoteCard() {
  const [current, setCurrent] = useState(() => ({
    index: randomIndex(),
    write: false,
  }));
  const [paused, setPaused] = useState(false);
  const quote = quotes[current.index];
  const quoted = `“${quote.text}”`;

  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => setCurrent(nextQuote(current.index)), DWELL);

    return () => clearTimeout(timer);
  }, [current.index, paused]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <figure
      data-write={current.write || undefined}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onPointerCancel={resume}
      onFocus={pause}
      onBlur={resume}
      className="v-gutter flex min-h-0 items-start gap-4 self-start"
    >
      <div className="flex max-w-135 flex-1 flex-col gap-2 md:gap-3">
        <blockquote className="text-quote md:text-quote-md">
          <p key={current.index}>
            {pacedWords(quoted).map(({ word, startsAt }, position) => (
              <Fragment key={position}>
                {position > 0 && " "}
                <span className="v-write" style={writeFrom(startsAt)}>
                  {word}
                </span>
              </Fragment>
            ))}
          </p>
        </blockquote>
        <figcaption className="text-quote md:text-quote-md font-bold">
          <span
            key={current.index}
            className="v-write"
            style={writeFrom(quoted.length + 1)}
          >
            {quote.author}
          </span>
        </figcaption>
      </div>
      <button
        type="button"
        aria-label="Show another quote"
        onClick={() => setCurrent(nextQuote(current.index))}
        className="v-focus-ring -mx-2 -mt-1.75 flex size-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:text-white motion-safe:active:scale-95 md:mt-0.5"
      >
        <RefreshIcon className="size-4.5" />
      </button>
    </figure>
  );
}
