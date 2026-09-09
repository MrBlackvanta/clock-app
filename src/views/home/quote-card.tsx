import { RefreshIcon } from "@/components/icons";
import { quotes } from "@/data";
import { useState } from "react";

function anotherIndex(current: number) {
  return (
    (current + 1 + Math.floor(Math.random() * (quotes.length - 1))) %
    quotes.length
  );
}

export default function QuoteCard() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  return (
    <figure className="v-gutter flex min-h-0 items-start gap-4 self-start">
      <div
        aria-live="polite"
        className="flex max-w-135 flex-1 flex-col gap-2 md:gap-3"
      >
        <blockquote className="text-quote md:text-quote-md">
          <p>“{quote.text}”</p>
        </blockquote>
        <figcaption className="text-quote md:text-quote-md font-bold">
          {quote.author}
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
