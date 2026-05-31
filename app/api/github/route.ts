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

  if (!token) {
    return NextResponse.json({ error: "No GitHub token" }, { status: 500 });
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    next: { revalidate: 3600 }, // cache 1 jam
  });

  const data = await res.json();
  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  return NextResponse.json(calendar);
}