import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Greyari";

const query = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

// In-memory cache to handle rapid refreshes without triggering GitHub rate limits
let memoryCache: {
  data: unknown;
  timestamp: number;
} | null = null;

const CACHE_TTL = 60 * 1000; // 60 seconds memory cache

export async function GET() {
  const now = Date.now();

  // 1. Serve immediately from memory cache if available and fresh
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL) {
    return NextResponse.json(memoryCache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  }

  const token = process.env.GITHUB_TOKEN;

  // 2. Try GitHub GraphQL API if GITHUB_TOKEN is provided
  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        next: { revalidate: 1800 },
      });

      if (res.ok) {
        const data = await res.json();
        const calendar =
          data?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          memoryCache = { data: calendar, timestamp: now };
          return NextResponse.json(calendar, {
            headers: {
              "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
            },
          });
        }
      }
    } catch {
      // Fallback to public endpoint below
    }
  }

  // 3. Public live GitHub contributions endpoint (No token required)
  try {
    const [contribRes, userRes] = await Promise.all([
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        { next: { revalidate: 1800 } }
      ),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
    ]);

    if (contribRes.ok) {
      const contribData = await contribRes.json();
      const userData = userRes && userRes.ok ? await userRes.json() : null;

      const days: { date: string; count: number; level: number }[] =
        contribData.contributions || [];

      // Group days into Sunday-to-Saturday weeks
      const weeks: {
        contributionDays: { contributionCount: number; date: string }[];
      }[] = [];
      let currentWeek: { contributionCount: number; date: string }[] = [];

      days.forEach((day, idx) => {
        const d = new Date(day.date);
        const dayOfWeek = d.getUTCDay();
        if (dayOfWeek === 0 && currentWeek.length > 0) {
          weeks.push({ contributionDays: currentWeek });
          currentWeek = [];
        }
        currentWeek.push({
          contributionCount: day.count,
          date: day.date,
        });
        if (idx === days.length - 1 && currentWeek.length > 0) {
          weeks.push({ contributionDays: currentWeek });
        }
      });

      const payload = {
        totalContributions: contribData?.total?.lastYear ?? 996,
        weeks,
        profile: userData
          ? {
              publicRepos: userData.public_repos,
              followers: userData.followers,
              avatarUrl: userData.avatar_url,
              bio: userData.bio,
            }
          : {
              publicRepos: 18,
              followers: 8,
              avatarUrl: "https://github.com/Greyari.png",
              bio: "Full-Stack Developer & System Architect",
            },
      };

      memoryCache = { data: payload, timestamp: now };
      return NextResponse.json(payload, {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      });
    }
  } catch {
    // If network or rate limit fails, continue to fallback below
  }

  // 4. If memory cache exists (even if stale), serve it instead of failing
  if (memoryCache) {
    return NextResponse.json(memoryCache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  }

  // 5. Safe graceful fallback response (Never returns 500 error on rapid refresh!)
  return NextResponse.json(
    {
      totalContributions: 996,
      weeks: [],
      profile: {
        publicRepos: 18,
        followers: 8,
        avatarUrl: "https://github.com/Greyari.png",
        bio: "Full-Stack Developer & System Architect",
      },
      fallback: true,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300",
      },
    }
  );
}
