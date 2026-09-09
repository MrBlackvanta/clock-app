import { useSyncExternalStore } from "react";

const MINUTE = 60_000;

const listeners = new Set<() => void>();

let now = new Date();
let timer: ReturnType<typeof setTimeout>;

function advance() {
  now = new Date();
  for (const listener of listeners) listener();
  scheduleNextMinute();
}

function scheduleNextMinute() {
  timer = setTimeout(advance, MINUTE - (Date.now() % MINUTE));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    now = new Date();
    scheduleNextMinute();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

const getSnapshot = () => now;
const getServerSnapshot = () => null;

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
