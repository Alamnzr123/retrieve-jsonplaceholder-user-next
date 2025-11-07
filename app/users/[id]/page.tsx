import React from "react";
import type { User, Post } from "../../lib/types";
import PostList from "../../../components/PostList";
import dynamic from "next/dynamic";

const UserDetail = dynamic(() => import("../../../components/UserDetail"), {
  ssr: false,
});

async function fetchUser(id: string): Promise<User | null> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL("/api/data/users", base).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const users: User[] = await res.json();
  return users.find((u) => String(u.id) === String(id)) ?? null;
}

async function fetchPostsForUser(id: string): Promise<Post[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL("/api/data/posts", base).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const posts: Post[] = await res.json();
  return posts.filter((p) => String(p.userId) === String(id));
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  const posts = await fetchPostsForUser(params.id);

  if (!user) {
    return <div className="p-4">User not found</div>;
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-xl font-semibold">{user.name}</h1>
        <div className="space-y-6">
          <div>
            <UserDetail initial={user} />
          </div>
          <aside>
            <h2 className="mb-2 font-semibold">Posts</h2>
            <PostList posts={posts} />
          </aside>
        </div>
      </div>
    </div>
  );
}
