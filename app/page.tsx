import React from "react";
import type { User } from "./lib/types";
import dynamic from "next/dynamic";

const ClientHome = dynamic(() => import("../components/HomeClient"), {
  ssr: false,
});

async function fetchUsers(): Promise<User[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;
  const url = new URL("/api/data/users", base).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const users = await fetchUsers();
  return <ClientHome users={users} />;
}
