"use client";

import { useSyncExternalStore } from "react";
import type { ProgressData } from "@/lib/storage";

const PROGRESS_KEY = "ccp.progress.v1";
const PROGRESS_EVENT = "ccp:progress-changed";

function safeParseProgress(raw: string | null): ProgressData {
  const empty: ProgressData = {
    version: 1,
    attempts: [],
    sessions: [],
    examResults: [],
    bookmarks: [],
    flags: {},
    flashcardStatus: {},
    studyPlan: null,
    activityDays: [],
  };
  if (!raw) return empty;
  try {
    return { ...empty, ...(JSON.parse(raw) as Partial<ProgressData>), version: 1 };
  } catch {
    return empty;
  }
}

let progressCache: { raw: string | null; data: ProgressData } | null = null;

function getProgressSnapshot(): ProgressData {
  const raw = window.localStorage.getItem(PROGRESS_KEY);
  if (!progressCache || progressCache.raw !== raw) {
    progressCache = { raw, data: safeParseProgress(raw) };
  }
  return progressCache.data;
}

function subscribeProgress(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === PROGRESS_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(PROGRESS_EVENT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(PROGRESS_EVENT, cb);
  };
}

export function notifyProgressChanged() {
  if (typeof window !== "undefined") {
    progressCache = null;
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }
}

/** Progress data; `null` during SSR/first paint, real data after hydration. */
export function useProgress(): ProgressData | null {
  return useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    () => null,
  );
}

/** true after client hydration — gate client-only UI without effects. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
