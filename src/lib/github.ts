import { cacheLife } from "next/cache";
import { site } from "@/data/site";

/* ------------------------------------------------------------------
   GitHub contribution calendar (official GraphQL API).
   Cached for ~1 day via "use cache" + cacheLife("days").
   Any failure (no token, expired token, API error) returns null so
   the section simply hides instead of breaking the page.
------------------------------------------------------------------- */

export type ContributionDay = {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsData = {
  total: number;
  /** Each week: up to 7 days, ordered from the week's first day. */
  weeks: ContributionDay[][];
  /** Row index (0-6) of Mon / Wed / Fri within a week column. */
  mondayRow: number;
  wednesdayRow: number;
  fridayRow: number;
  /** Month label per week column (usually null). */
  monthLabels: (string | null)[];
  currentStreak: number;
  bestStreak: number;
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number }[];
          }[];
        };
      };
    };
  };
};

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Intensity buckets (roughly GitHub's quartile feel). */
function levelFor(count: number): ContributionDay["level"] {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** Day of week from an ISO date, pure arithmetic (0 = Sunday). */
function dayOfWeek(iso: string): number {
  const [yRaw, m, d] = iso.split("-").map(Number);
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = m < 3 ? yRaw - 1 : yRaw;
  return (
    (y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) +
      t[m - 1] +
      d) %
    7
  );
}

/** "2026-10-05" -> "Oct 5, 2026" (no Date object — stays prerender-safe). */
export function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

function computeMonthLabels(weeks: ContributionDay[][]): (string | null)[] {
  let lastLabeled = -1;
  return weeks.map((week, i) => {
    if (i === 0 && week.length > 0) {
      lastLabeled = Number(week[0].date.slice(5, 7));
      return MONTHS[lastLabeled - 1];
    }
    const firstOfMonth = week.find((day) => day.date.slice(8, 10) === "01");
    if (firstOfMonth) {
      const month = Number(firstOfMonth.date.slice(5, 7));
      if (month !== lastLabeled) {
        lastLabeled = month;
        return MONTHS[month - 1];
      }
    }
    return null;
  });
}

function computeStreaks(counts: number[]): {
  currentStreak: number;
  bestStreak: number;
} {
  // Current streak: walk backwards; allow one zero at the very end
  // (today may not have contributions yet).
  let currentStreak = 0;
  for (let i = counts.length - 1; i >= 0; i--) {
    if (counts[i] > 0) {
      currentStreak++;
    } else if (i === counts.length - 1) {
      continue;
    } else {
      break;
    }
  }

  let bestStreak = 0;
  let run = 0;
  for (const count of counts) {
    if (count > 0) {
      run++;
      if (run > bestStreak) bestStreak = run;
    } else {
      run = 0;
    }
  }

  return { currentStreak, bestStreak };
}

export async function getContributions(): Promise<ContributionsData | null> {
  "use cache";
  cacheLife("days");

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": `${site.githubUsername}-portfolio`,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: site.githubUsername },
      }),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as GraphQLResponse;
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const weeks: ContributionDay[][] = calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelFor(day.contributionCount),
      })),
    );
    if (weeks.length === 0) return null;

    const weekStartDow = dayOfWeek(weeks[0][0].date);
    const rowOf = (dow: number) => (dow - weekStartDow + 7) % 7;
    const counts = weeks.flat().map((day) => day.count);

    return {
      total: calendar.totalContributions,
      weeks,
      mondayRow: rowOf(1),
      wednesdayRow: rowOf(3),
      fridayRow: rowOf(5),
      monthLabels: computeMonthLabels(weeks),
      ...computeStreaks(counts),
    };
  } catch {
    return null;
  }
}
