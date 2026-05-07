import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { TimetableDay } from "../types";

const DAY_START_MIN = 8 * 60;
const DAY_END_MIN = 22 * 60;

const PX_PER_MIN = 2.2;
const GAP_PX = 4;
const CLUSTER_GAP_PX = 14;
const BLOCK_INSET_Y = 2;
const BLOCK_INSET_X = 2;
const MIN_EVENT_MINUTES = 15;

const GROUPS = ["młodsza", "starsza", "elita"] as const;

const typeClasses: Record<string, string> = {
  contest: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-900",
  lecture: "bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-900",
  workshop: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900",
  meal: "bg-green-100 text-green-900 border-green-300 dark:bg-green-950/50 dark:text-green-200 dark:border-green-900",
  free_time: "bg-muted text-foreground border-border dark:bg-muted/70",
  match: "bg-pink-100 text-pink-900 border-pink-300 dark:bg-pink-950/50 dark:text-pink-200 dark:border-pink-900",
  other: "bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-900/60 dark:text-slate-200 dark:border-slate-700",
};

type Slot = TimetableDay["slots"][number];
type GroupFilter = typeof GROUPS[number] | null;

type BaseItem = {
  key: string;
  s: Slot;
  startMin: number;
  endMin: number;
  col: number;
  cols: number;
  clusterIndex: number;
};

type Cluster = {
  index: number;
  items: BaseItem[];
  startMin: number;
  endMin: number;
  cols: number;
};

type RenderedBlock = BaseItem & {
  top: number;
  height: number;
};

type DayLayout = {
  blocks: RenderedBlock[];
  totalHeight: number;
  hourLines: { minute: number; y: number }[];
};

function toMin(hhmm?: string) {
  if (!hhmm) return DAY_START_MIN;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function minuteLabel(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function addMinutes(hhmm: string, minutes: number) {
  const total = toMin(hhmm) + minutes;
  return minuteLabel(total);
}

function getTimeText(s: Slot) {
  if (s.start && s.end && s.duration) {
    return `${s.start}–${s.end} · ${s.duration} min`;
  }

  if (s.start && s.end) {
    return `${s.start}–${s.end}`;
  }

  if (s.start && s.duration) {
    const end = addMinutes(s.start, s.duration);
    return `${s.start}–${end} · ${s.duration} min`;
  }

  if (s.start) return s.start;
  if (s.end) return `–${s.end}`;
  if (s.duration) return `${s.duration} min`;

  return "";
}

function filterDaysByGroup(days: TimetableDay[], selectedGroup: GroupFilter): TimetableDay[] {
  return days.map((day) => ({
    ...day,
    slots: day.slots.filter((slot) => {
      if (!selectedGroup) {
        return slot.type !== "free_time";
      }

      return (
        slot.groups?.includes(selectedGroup) ||
        slot.groups?.includes("wszyscy")
      );
    }),
  }));
}

function buildClusters(day: TimetableDay): Cluster[] {
  const items: BaseItem[] = day.slots
    .map((s, i) => {
      const startMin = s.start ? toMin(s.start) : DAY_START_MIN;
      const endMin = s.end
        ? toMin(s.end)
        : s.duration
          ? startMin + s.duration
          : startMin + MIN_EVENT_MINUTES;

      return {
        key: `${day.label}-${i}-${s.title}-${s.start ?? ""}`,
        s,
        startMin,
        endMin: Math.max(endMin, startMin + 1),
        col: 0,
        cols: 1,
        clusterIndex: -1,
      };
    })
    .sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);

  const clusters: Cluster[] = [];
  let active: BaseItem[] = [];
  let clusterItems: BaseItem[] = [];
  let clusterStart = 0;
  let clusterEnd = 0;

  const finalizeCluster = () => {
    if (!clusterItems.length) return;

    const clusterIndex = clusters.length;
    const maxCols = Math.max(...clusterItems.map(x => x.col)) + 1;

    clusterItems.forEach(x => {
      x.cols = maxCols;
      x.clusterIndex = clusterIndex;
    });

    clusters.push({
      index: clusterIndex,
      items: [...clusterItems],
      startMin: clusterStart,
      endMin: clusterEnd,
      cols: maxCols,
    });

    clusterItems = [];
    clusterStart = 0;
    clusterEnd = 0;
  };

  for (const ev of items) {
    active = active.filter(a => a.endMin > ev.startMin);

    if (active.length === 0 && clusterItems.length > 0) {
      finalizeCluster();
    }

    if (clusterItems.length === 0) {
      clusterStart = ev.startMin;
      clusterEnd = ev.endMin;
    } else {
      clusterEnd = Math.max(clusterEnd, ev.endMin);
    }

    const used = new Set(active.map(a => a.col));
    let c = 0;
    while (used.has(c)) c++;
    ev.col = c;

    active.push(ev);
    clusterItems.push(ev);
  }

  finalizeCluster();
  return clusters;
}

function computeDayLayout(
  clusters: Cluster[],
  measuredHeights: Record<string, number>
): DayLayout {
  const blocks: RenderedBlock[] = [];
  const hourLines: { minute: number; y: number }[] = [];

  let cursorY = 0;

  for (const cluster of clusters) {
    const duration = Math.max(1, cluster.endMin - cluster.startMin);

    let scale = PX_PER_MIN;
    for (const item of cluster.items) {
      const dur = Math.max(1, item.endMin - item.startMin);
      const measured = measuredHeights[item.key] ?? 44;
      scale = Math.max(scale, measured / dur);
    }

    const itemsByCol = Array.from({ length: cluster.cols }, () => [] as BaseItem[]);
    for (const item of cluster.items) {
      itemsByCol[item.col].push(item);
    }

    let clusterBottom = cursorY;

    for (const colItems of itemsByCol) {
      colItems.sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);

      let prevBottom = cursorY;

      for (const item of colItems) {
        const idealTop = cursorY + (item.startMin - cluster.startMin) * scale + BLOCK_INSET_Y;
        const measured = measuredHeights[item.key] ?? 44;
        const timeHeight = Math.max((item.endMin - item.startMin) * scale - BLOCK_INSET_Y * 2, 24);
        const height = Math.max(measured, timeHeight);
        const top = Math.max(idealTop, prevBottom + 2);

        blocks.push({
          ...item,
          top,
          height,
        });

        prevBottom = top + height;
        clusterBottom = Math.max(clusterBottom, prevBottom);
      }
    }

    const effectiveScale = Math.max((clusterBottom - cursorY) / duration, scale);

    for (let m = Math.ceil(cluster.startMin / 60) * 60; m <= cluster.endMin; m += 60) {
      if (m < DAY_START_MIN || m > DAY_END_MIN) continue;
      hourLines.push({
        minute: m,
        y: cursorY + (m - cluster.startMin) * effectiveScale,
      });
    }

    cursorY = clusterBottom + CLUSTER_GAP_PX;
  }

    const uniqueHourLines = Array.from(
    new Map(
      hourLines.map((line) => [
        line.minute,
        line,
      ])
    ).values()
  );

  return {
    blocks,
    totalHeight: Math.max(cursorY - CLUSTER_GAP_PX, 0),
    hourLines: uniqueHourLines,
  };
}

function BlockContent({
  slot,
  cols,
}: {
  slot: Slot;
  cols: number;
}) {
  const compact = cols >= 3;

  return (
    <div className="flex min-w-0 flex-col">
      <div className="text-[10px] font-medium tabular-nums opacity-75">
        {getTimeText(slot)}
      </div>

      <div className={`mt-1 break-words font-semibold leading-tight ${compact ? "text-[12px]" : "text-[13px]"}`}>
        {slot.title}
      </div>

      {slot.groups?.length ? (
        <div className="mt-1 flex flex-wrap gap-1">
          {slot.groups.map((g) => (
            <span
              key={g}
              className="rounded border border-border/80 bg-background/80 px-1.5 py-0.5 text-[10px] dark:bg-background/60"
            >
              {g}
            </span>
          ))}
        </div>
      ) : null}

      {slot.notes ? (
        <div className="mt-1 break-words text-[11px] italic opacity-70">
          {slot.notes}
        </div>
      ) : null}

      {slot.location ? (
        <div className="mt-1 break-words text-[10px] opacity-75">
          {slot.location}
        </div>
      ) : null}
    </div>
  );
}

export default function Timetable() {
  const [days, setDays] = useState<TimetableDay[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupFilter>(null);
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch("/data/timetable.json")
      .then(r => r.json())
      .then(d => setDays(d.days));
  }, []);

  const filteredDays = useMemo(
    () => filterDaysByGroup(days, selectedGroup),
    [days, selectedGroup]
  );

  const dayStructures = useMemo(
    () => filteredDays.map((day) => ({ day, clusters: buildClusters(day) })),
    [filteredDays]
  );

  useLayoutEffect(() => {
    const next: Record<string, number> = {};

    for (const [key, el] of Object.entries(measureRefs.current)) {
      if (!el) continue;
      next[key] = Math.ceil(el.getBoundingClientRect().height) + 10;
    }

    const changed =
      Object.keys(next).length !== Object.keys(measuredHeights).length ||
      Object.entries(next).some(([k, v]) => measuredHeights[k] !== v);

    if (changed) {
      setMeasuredHeights(next);
    }
  }, [dayStructures, measuredHeights]);

  const laidOutDays = useMemo(
    () =>
      dayStructures.map(({ day, clusters }) => ({
        day,
        clusters,
        layout: computeDayLayout(clusters, measuredHeights),
      })),
    [dayStructures, measuredHeights]
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedGroup(null)}
          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
            selectedGroup === null
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-muted hover:cursor-pointer"
          }`}
        >
          Wszystkie
        </button>

        {GROUPS.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setSelectedGroup(group)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
              selectedGroup === group
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted hover:cursor-pointer"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="flex gap-8 overflow-x-auto pb-4 pr-2">
        {laidOutDays.map(({ day, clusters, layout }) => {
          const { blocks, totalHeight, hourLines } = layout;

          return (
            <div key={day.label} className="w-90 shrink-0">
              <h2 className="mb-3 text-center text-xl font-semibold tracking-tight">
                {day.label}
              </h2>

              <div className="grid grid-cols-[56px_1fr] gap-3">
                <div className="relative" style={{ height: totalHeight }}>
                  {hourLines.map(({ minute, y }, idx) => (
                    <div
                      key={`${day.label}-mark-${minute}-${idx}`}
                      className="absolute w-full -translate-y-1/2 select-none pr-2 text-right text-xs font-medium tabular-nums text-muted-foreground"
                      style={{ top: y }}
                    >
                      {minuteLabel(minute)}
                    </div>
                  ))}
                </div>

                <div
                  className="relative rounded-lg border bg-card p-2"
                  style={{ height: totalHeight }}
                >
                  {hourLines.map(({ minute, y }, idx) => (
                    <div
                      key={`${day.label}-line-${minute}-${idx}`}
                      className="absolute left-0 right-0 border-t border-border/60"
                      style={{ top: y }}
                    />
                  ))}

                  <div className="pointer-events-none absolute inset-0 opacity-0">
                    {clusters.flatMap((cluster) =>
                      cluster.items.map((item) => {
                        const totalGap = (cluster.cols - 1) * GAP_PX;
                        const width = `calc((100% - ${totalGap}px) / ${cluster.cols} - 4px)`;
                        const left = `calc(((${width}) + ${GAP_PX}px) * ${item.col} + ${BLOCK_INSET_X}px)`;

                        return (
                          <div
                            key={`measure-${item.key}`}
                            className={`absolute rounded-md border ${cluster.cols >= 3 ? "px-1.5 py-1" : "px-2.5 py-1.5"} ${typeClasses[item.s.type] || typeClasses.other}`}
                            style={{ top: 0, left, width }}
                          >
                            <div
                              ref={(el) => {
                                measureRefs.current[item.key] = el;
                              }}
                            >
                              <BlockContent slot={item.s} cols={cluster.cols} />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {blocks.map(({ key, s, top, height, col, cols }) => {
                    const totalGap = (cols - 1) * GAP_PX;
                    const width = `calc((100% - ${totalGap}px) / ${cols} - 4px)`;
                    const left = `calc(((${width}) + ${GAP_PX}px) * ${col} + ${BLOCK_INSET_X}px)`;

                    const tooltip = [
                      s.title,
                      getTimeText(s),
                      s.location,
                      s.groups?.length ? `Grupy: ${s.groups.join(", ")}` : "",
                      s.notes,
                    ]
                      .filter(Boolean)
                      .join("\n");

                    return (
                      <div
                        key={key}
                        className={`absolute rounded-md border shadow-sm ${cols >= 3 ? "px-1.5 py-1" : "px-2.5 py-1.5"} ${typeClasses[s.type] || typeClasses.other}`}
                        style={{ top, height, left, width }}
                        title={tooltip}
                      >
                        <div className="h-full overflow-hidden">
                          <BlockContent slot={s} cols={cols} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}