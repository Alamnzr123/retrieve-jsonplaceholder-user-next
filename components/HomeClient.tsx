"use client";
import React from "react";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import type { User } from "../app/lib/types";

export default function HomeClient({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = React.useState<User[]>(initialUsers ?? []);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const filtered = React.useMemo(() => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q),
    );
  }, [users, query]);

  const onSearch = (text: string) => {
    setQuery(text);
    setPage(1);
  };

  const onSort = (key: keyof User, dir: "asc" | "desc") => {
    const sorted = [...users].sort((a, b) => {
      const av = String(a[key] ?? "").toLowerCase();
      const bv = String(b[key] ?? "").toLowerCase();
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    setUsers(sorted);
  };

  return (
    <>
      <main className="p-4 sm:ml-64">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Users</h1>
          <div>
            <label className="mr-2">Sort:</label>
            <select
              onChange={(e) =>
                onSort("id", e.target.value === "asc" ? "asc" : "desc")
              }
              defaultValue={"asc"}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <UserTable
          users={filtered}
          page={page}
          perPage={perPage}
          onSort={onSort}
        />
        <Pagination
          page={page}
          total={filtered.length}
          perPage={perPage}
          onPage={setPage}
        />
      </main>
    </>
  );
}
