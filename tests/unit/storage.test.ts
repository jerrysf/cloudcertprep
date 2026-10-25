import { describe, expect, it } from "vitest";
import {
  computeStreak,
  createLocalStorageStore,
  EMPTY_PROGRESS,
  recordActivityDay,
  summarize,
} from "@/lib/storage";

function memStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  };
}

describe("localStorage progress store", () => {
  it("round-trips progress data", () => {
    const store = createLocalStorageStore(memStorage());
    const data = structuredClone(EMPTY_PROGRESS);
    data.bookmarks.push("saa-sec-001");
    store.save(data);
    expect(store.load().bookmarks).toEqual(["saa-sec-001"]);
  });

  it("returns empty progress for missing or corrupt data", () => {
    const storage = memStorage();
    const store = createLocalStorageStore(storage);
    expect(store.load().attempts).toEqual([]);
    storage.setItem("ccp.progress.v1", "{not json");
    expect(store.load().attempts).toEqual([]);
  });

  it("reset removes stored data", () => {
    const store = createLocalStorageStore(memStorage());
    store.save({ ...structuredClone(EMPTY_PROGRESS), bookmarks: ["x"] });
    store.reset();
    expect(store.load().bookmarks).toEqual([]);
  });
});

describe("recordActivityDay + computeStreak", () => {
  it("counts consecutive days ending today", () => {
    const data = structuredClone(EMPTY_PROGRESS);
    const today = new Date("2026-10-25T12:00:00Z");
    recordActivityDay(data, today);
    recordActivityDay(data, today); // dedupe
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    recordActivityDay(data, yesterday);
    expect(data.activityDays).toHaveLength(2);
    expect(computeStreak(data.activityDays, today)).toBe(2);
  });

  it("returns 0 with a gap before today", () => {
    const today = new Date("2026-10-25T12:00:00Z");
    const days = ["2026-10-20", "2026-10-21"];
    expect(computeStreak(days, today)).toBe(0);
  });

  it("still counts a streak when today has no activity yet but yesterday does", () => {
    const today = new Date("2026-10-25T12:00:00Z");
    const days = ["2026-10-23", "2026-10-24"];
    expect(computeStreak(days, today)).toBe(2);
  });
});

describe("summarize", () => {
  it("computes accuracy, topic stats, and review set", () => {
    const data = structuredClone(EMPTY_PROGRESS);
    data.attempts = [
      { questionId: "q1", correct: true, answeredAt: "", domain: "design-secure-architectures", topic: "t1" },
      { questionId: "q2", correct: false, answeredAt: "", domain: "design-secure-architectures", topic: "t1" },
      { questionId: "q2", correct: true, answeredAt: "", domain: "design-secure-architectures", topic: "t1" },
    ];
    const s = summarize(data);
    expect(s.attempted).toBe(3);
    expect(s.correct).toBe(2);
    expect(s.accuracy).toBeCloseTo(2 / 3);
    expect(s.byTopic.get("t1")).toEqual({ total: 3, correct: 2 });
    // q2 was wrong then later right — it leaves the review set
    expect(s.incorrectIds.has("q2")).toBe(false);
  });

  it("returns null accuracy with no attempts", () => {
    expect(summarize(structuredClone(EMPTY_PROGRESS)).accuracy).toBeNull();
  });
});
