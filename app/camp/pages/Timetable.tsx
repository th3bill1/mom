import { Link } from "react-router";

export default function Timetable() {
  return (
    <div>
        <h2 className="text-xl font-semibold">Kalendarz będzie dostępny wkrótce</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Tymczasem możesz przejść do odpowiednich podstron:
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
          <li>
            <Link to="/zadania" className="text-blue-600 dark:text-blue-400 hover:underline">
              Zadania bieżącej edycji
            </Link>
          </li>
          <li>
            <Link to="/archiwum" className="text-blue-600 dark:text-blue-400 hover:underline">
              Archiwum zadań
            </Link>
          </li>
          <li>
            <Link to="/mecz/zadania" className="text-blue-600 dark:text-blue-400 hover:underline">
              Zadania Meczu Matematycznego
            </Link>
          </li>
        </ul>
    </div>
  );
}

{/* {days.map((day) => {
        const totalHeight = (DAY_END_MIN - DAY_START_MIN) * PX_PER_MIN;
        const laid = layoutBlocks(day);
        const marks = hourMarks(DAY_START_MIN, DAY_END_MIN);

        return (
          <div key={day.label} className="shrink-0 w-90">
            <h2 className="text-xl font-semibold mb-3 text-center">{day.label}</h2>

            <div className="grid grid-cols-[56px_1fr] gap-3">
              <div className="relative" style={{ height: totalHeight }}>
                {marks.map(h => (
                  <div
                    key={h}
                    className="absolute -translate-y-1/2 text-xs text-muted-foreground select-none"
                    style={{ top: ((h * 60 - DAY_START_MIN) * PX_PER_MIN) }}
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              <div
                className="relative rounded-lg border bg-card overflow-hidden p-2"
                style={{
                  height: totalHeight,
                  backgroundImage:
                    `repeating-linear-gradient(to bottom,
                      transparent 0px,
                      transparent ${60 * PX_PER_MIN - 1}px,
                      rgba(0,0,0,0.05) ${60 * PX_PER_MIN - 1}px,
                      rgba(0,0,0,0.05) ${60 * PX_PER_MIN}px)`,
                }}
              >

                {marks.map(h => (
                  <div
                    key={`line-${h}`}
                    className="absolute left-0 right-0 border-t border-border/60"
                    style={{ top: (h * 60 - DAY_START_MIN) * PX_PER_MIN }}
                  />
                ))}

                {laid.map(({ key, s, top, height, col, cols }) => {
                  const totalGap = (cols - 1) * GAP_PX;
                  const baseWidth = `calc((100% - ${totalGap}px) / ${cols} - 4px)`;
                  const left = `calc(((${baseWidth}) + ${GAP_PX}px) * ${col} + 2px)`;

                  const timeText = s.start
                    ? (s.end ? `${s.start}–${s.end}` : s.duration ? `${s.start} · ${s.duration} min` : s.start)
                    : (s.end ? `–${s.end}` : s.duration ? `${s.duration} min` : "");

                  return (
                    <div
                      key={key}
                      className={`absolute rounded-md border px-2.5 py-1.5 shadow-sm overflow-hidden ${typeClasses[s.type] || typeClasses.other}`}
                      style={{ top, height, left, width: baseWidth }}
                      title={s.location || undefined} // tooltip fallback
                    >

                      <div className="text-[9px] opacity-70 flex items-center gap-2  min-w-0">
                        <span className="whitespace-nowrap">{timeText}</span>
                        {s.location ? (
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                            • {s.location}
                          </span>
                        ) : null}
                      </div>

                      <div className="font-normal text-sm leading-snug">{s.title}</div>

                      {s.groups?.length ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {s.groups.map(g => (
                            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-background/80 border border-border/80 dark:bg-background/60">
                              {g}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {s.notes ? (
                        <div className="mt-1 text-[11px] italic opacity-70">{s.notes}</div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })} */}