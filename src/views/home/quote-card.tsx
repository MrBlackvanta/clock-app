import { RefreshIcon } from "@/components/icons";
import { quotes } from "@/data";
import { Fragment, useState, type CSSProperties } from "react";

function randomIndex() {
  return Math.floor(Math.random() * quotes.length);
}

function anotherIndex(current: number) {
  return (
    (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) %
    quotes.length
  );
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
  const [index, setIndex] = useState(randomIndex);
  const quote = quotes[index];
  const quoted = `“${quote.text}”`;

  return (
    <figure className="v-gutter flex min-h-0 items-start gap-4 self-start">
      <div
        aria-live="polite"
        className="flex max-w-135 flex-1 flex-col gap-2 md:gap-3"
      >
        <blockquote className="text-quote md:text-quote-md">
          <p key={index}>
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
            key={index}
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
        onClick={() => setIndex(anotherIndex)}
        className="v-focus-ring -mx-2 -mt-1.75 flex size-8 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:text-white motion-safe:active:scale-95 md:mt-0.5"
      >
        <RefreshIcon className="size-4.5" />
      </button>
    </figure>
  );
}
