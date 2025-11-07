import { NextResponse } from "next/server";
import type { User } from "../../../lib/types";

let cache: { timestamp: number; data: User[] } | null = null;

export async function GET() {
  const now = Date.now();
  // cache for 60 seconds
  if (cache && now - cache.timestamp < 1000 * 60) {
    return NextResponse.json(cache.data);
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 502 },
    );
  }
  const data: User[] = await res.json();
  cache = { timestamp: now, data };
  return NextResponse.json(data);
}
