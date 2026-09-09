import type { Place } from "@/lib";
import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

let place: Place | null = null;
let requested = false;

async function fetchPlace(): Promise<Place | null> {
  try {
    const response = await fetch("/api/place");
    return response.ok ? ((await response.json()) as Place) : null;
  } catch {
    return null;
  }
}

function requestOnce() {
  requested = true;
  void fetchPlace().then((result) => {
    if (!result?.city) return;
    place = result;
    for (const listener of listeners) listener();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!requested) requestOnce();

  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => place;
const getServerSnapshot = () => null;

export function usePlace() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
