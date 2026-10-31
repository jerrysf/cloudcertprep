"use client";

import { useState } from "react";
import { topicsByCert } from "@/lib/content/topics";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { publishedByCert } from "@/lib/content/questions";
import type { CertificationId } from "@/lib/content/schema";
import {
  generateStudyPlan,
  type StudyPlan,
  type StudyPlanInput,
} from "@/lib/study-plan";
import { getProgressStore } from "@/lib/storage";
import { useMounted } from "@/lib/use-progress";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui";

export function StudyPlanForm() {
  const mounted = useMounted();
  if (!mounted) {
    return (
      <Card>
        <p className="text-sm text-muted">Loading your saved plan…</p>
      </Card>
    );
  }
  return <StudyPlanFormInner />;
}

function StudyPlanFormInner() {
  const [saved] = useState(() => getProgressStore().load().studyPlan);
  const [certId, setCertId] = useState<CertificationId>(
    (saved?.certId as CertificationId) ?? "saa-c03",
  );
  const [experience, setExperience] = useState<StudyPlanInput["experience"]>(
    (saved?.experience as StudyPlanInput["experience"]) ?? "beginner",
  );
  const [hoursPerWeek, setHoursPerWeek] = useState(saved?.hoursPerWeek ?? 6);
  const [targetDate, setTargetDate] = useState(() => {
    if (saved?.targetDate) return saved.targetDate;
    const d = new Date();
    d.setDate(d.getDate() + 56);
    return d.toISOString().slice(0, 10);
  });
  const [weakTopics, setWeakTopics] = useState<string[]>(
    saved?.weakTopics ?? [],
  );
  const [plan, setPlan] = useState<StudyPlan | null>(() =>
    saved
      ? generateStudyPlan({
          certId: saved.certId as CertificationId | undefined,
          experience: saved.experience as StudyPlanInput["experience"],
          hoursPerWeek: saved.hoursPerWeek,
          targetDate: saved.targetDate,
          weakTopics: saved.weakTopics,
        })
      : null,
  );

  function selectCert(id: CertificationId) {
    setCertId(id);
    setWeakTopics((cur) =>
      cur.filter((slug) => topicsByCert(id).some((t) => t.slug === slug)),
    );
  }

  function toggleTopic(slug: string) {
    setWeakTopics((cur) =>
      cur.includes(slug) ? cur.filter((t) => t !== slug) : [...cur, slug],
    );
  }

  function generate() {
    const input: StudyPlanInput = {
      certId,
      experience,
      hoursPerWeek,
      targetDate,
      weakTopics,
    };
    const result = generateStudyPlan(input);
    setPlan(result);
    const store = getProgressStore();
    const data = store.load();
    data.studyPlan = {
      createdAt: new Date().toISOString(),
      certId,
      experience,
      hoursPerWeek,
      targetDate,
      weakTopics,
      weeks: result.weeks.map((w) => ({
        week: w.week,
        focus: w.focus,
        tasks: w.tasks,
      })),
    };
    store.save(data);
    track(ANALYTICS_EVENTS.studyPlanCreate, {
      experience,
      hoursPerWeek,
      weeks: result.totalWeeks,
    });
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      <Card className="space-y-5 self-start">
        <h2 className="text-lg font-semibold">Your situation</h2>
        <label className="block text-sm font-medium">
          Certification
          <select
            className={inputClass}
            value={certId}
            onChange={(e) => selectCert(e.target.value as CertificationId)}
          >
            {CERTIFICATIONS.filter((c) => publishedByCert(c.id).length > 0).map(
              (c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name.replace("AWS Certified ", "")}
                </option>
              ),
            )}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Current experience level
          <select
            className={inputClass}
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value as StudyPlanInput["experience"])
            }
          >
            <option value="beginner">New to AWS / IT</option>
            <option value="some-it">IT experience, new to AWS</option>
            <option value="aws-hands-on">Hands-on AWS experience</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Study hours per week
          <input
            type="number"
            min={1}
            max={40}
            className={inputClass}
            value={hoursPerWeek}
            onChange={(e) =>
              setHoursPerWeek(Math.max(1, Math.min(40, Number(e.target.value) || 1)))
            }
          />
        </label>
        <label className="block text-sm font-medium">
          Target exam date
          <input
            type="date"
            className={inputClass}
            value={targetDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">
            Topics you find difficult (optional)
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {topicsByCert(certId).map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => toggleTopic(t.slug)}
                aria-pressed={weakTopics.includes(t.slug)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs",
                  weakTopics.includes(t.slug)
                    ? "border-accent bg-accent text-white"
                    : "border-border text-muted hover:border-accent/50",
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          onClick={generate}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Generate study plan
        </button>
      </Card>

      <div>
        {plan ? (
          <div className="space-y-4">
            {plan.notes.map((n) => (
              <p key={n} className="rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-900">
                {n}
              </p>
            ))}
            {plan.weeks.map((w) => (
              <Card key={w.week}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Week {w.week}
                    {w.start ? (
                      <span className="ml-2 text-sm font-normal text-muted">
                        {w.start} – {w.end}
                      </span>
                    ) : null}
                  </h3>
                  {w.checkpoint ? (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                      Checkpoint
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{w.focus}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {w.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Card>
            ))}
            <p className="text-xs text-muted">
              Plans are saved in this browser only. Adjust as you learn — treat
              the schedule as a guide, not a guarantee.
            </p>
          </div>
        ) : (
          <Card className="text-sm text-muted">
            Fill in your experience level, weekly hours, and target date, then
            generate a week-by-week schedule covering every exam domain with
            revision checkpoints and a final review period.
          </Card>
        )}
      </div>
    </div>
  );
}
