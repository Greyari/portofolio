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

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  // 1. Try GitHub GraphQL API if GITHUB_TOKEN is provided
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

      const data = await res.json();
      const calendar =
        data?.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        return NextResponse.json(calendar);
      }
    } catch {
      // Fallback to public contributions endpoint below
    }
  }

  // 2. Public live GitHub contributions endpoint (No token required, 100% real @Greyari data!)
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

    if (!contribRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch public contributions" },
        { status: 500 }
      );
    }

    const contribData = await contribRes.json();
    const userData = userRes && userRes.ok ? await userRes.json() : null;

    const days: { date: string; count: number; level: number }[] =
      contribData.contributions || [];

    // Group days into Sunday-to-Saturday weeks (matching GitHub's GraphQL structure)
    const weeks: {
      contributionDays: { contributionCount: number; date: string }[];
    }[] = [];
    let currentWeek: { contributionCount: number; date: string }[] = [];

    days.forEach((day, idx) => {
      const d = new Date(day.date);
      const dayOfWeek = d.getUTCDay(); // 0 = Sunday
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

    return NextResponse.json({
      totalContributions: contribData?.total?.lastYear ?? 0,
      weeks,
      profile: userData
        ? {
            publicRepos: userData.public_repos,
            followers: userData.followers,
            avatarUrl: userData.avatar_url,
            bio: userData.bio,
          }
        : null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
