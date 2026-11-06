import { FiActivity, FiZap, FiAward } from "react-icons/fi";
import type { IconType } from "react-icons";
import { getContributions, formatDateLabel } from "@/lib/github";

const LEVEL_CLASSES = [
  "bg-[#1a1a20]",
  "bg-brand/30",
  "bg-brand/50",
  "bg-brand/75",
  "bg-brand",
] as const;

const stats: { icon: IconType; label: string }[] = [
  { icon: FiActivity, label: "Contributions (last year)" },
  { icon: FiZap, label: "Current Streak" },
  { icon: FiAward, label: "Best Streak" },
];

export default async function Contributions() {
  const data = await getContributions();
  if (!data) return null; // no token / API failure → section hides itself

  const values = [
    data.total.toLocaleString("en-US"),
    `${data.currentStreak} ${data.currentStreak === 1 ? "day" : "days"}`,
    `${data.bestStreak} ${data.bestStreak === 1 ? "day" : "days"}`,
  ];

  const weekdayRows: { row: number; label: string }[] = [
    { row: data.mondayRow, label: "Mon" },
    { row: data.wednesdayRow, label: "Wed" },
    { row: data.fridayRow, label: "Fri" },
  ];

  return (
    <section
      id="contributions"
      className="border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand uppercase">
            Open Source Activity
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            GitHub Contributions
          </h2>
          <p className="mt-3 text-sm text-gray-400 sm:text-base">
            {data.total.toLocaleString("en-US")} contributions in the last year
          </p>
        </div>

        {/* Stat chips */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-surface p-5 transition-colors hover:border-brand/40"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-xl text-brand"
                aria-hidden="true"
              >
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="text-xl font-bold sm:text-2xl">{values[i]}</p>
                <p className="truncate text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-surface p-4 sm:p-6">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[792px]">
              {/* Month labels (aligned with week columns below) */}
              <div className="mb-2 flex gap-[3px] pl-10">
                {data.weeks.map((week, i) => (
                  <div key={`m-${i}`} className="w-3 shrink-0">
                    {data.monthLabels[i] && (
                      <span className="block text-[10px] whitespace-nowrap text-gray-500">
                        {data.monthLabels[i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Weekday labels + cells */}
              <div className="flex gap-2">
                <div className="flex w-8 shrink-0 flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, row) => (
                    <span
                      key={`w-${row}`}
                      className="flex h-3 items-center justify-end pr-1 text-[10px] leading-none text-gray-500"
                    >
                      {weekdayRows.find((w) => w.row === row)?.label ?? ""}
                    </span>
                  ))}
                </div>

                <div className="flex gap-[3px]">
                  {data.weeks.map((week, wi) => (
                    <div
                      key={`week-${wi}`}
                      className="flex flex-col gap-[3px]"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 7 }, (_, row) => {
                        const day = week[row];
                        if (!day) {
                          return (
                            <span
                              key={`e-${row}`}
                              className="h-3 w-3 rounded-[3px]"
                            />
                          );
                        }
                        return (
                          <span
                            key={day.date}
                            title={`${day.count} contribution${
                              day.count === 1 ? "" : "s"
                            } on ${formatDateLabel(day.date)}`}
                            className={`h-3 w-3 rounded-[3px] transition-transform hover:scale-125 hover:ring-1 hover:ring-brand-light ${LEVEL_CLASSES[day.level]}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-3 flex items-center justify-end gap-1.5 pr-1 text-[11px] text-gray-500">
                <span className="mr-1">Less</span>
                {LEVEL_CLASSES.map((cls) => (
                  <span
                    key={cls}
                    className={`h-3 w-3 rounded-[3px] ${cls}`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-right text-[11px] text-gray-600">
            Data from GitHub · refreshed daily
          </p>
        </div>
      </div>
    </section>
  );
}
