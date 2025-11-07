import { NextResponse } from "next/server";
import type { Post } from "../../../lib/types";

let cache: { timestamp: number; data: Post[] } | null = null;

export async function GET() {
  const now = Date.now();
  // cache for 60 seconds
  if (cache && now - cache.timestamp < 1000 * 60) {
    return NextResponse.json(cache.data);
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 502 },
    );
  }
  const data: Post[] = await res.json();
  cache = { timestamp: now, data };
  return NextResponse.json(data);
}
