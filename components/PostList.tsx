"use client";
import React from "react";
import type { Post } from "../app/lib/types";

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0)
    return <p className="text-sm text-gray-500">No posts</p>;

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <div key={p.id} className="rounded border p-3">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
