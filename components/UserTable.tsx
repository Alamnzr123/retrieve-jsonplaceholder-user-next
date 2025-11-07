"use client";
import React, { useMemo } from "react";
import type { User } from "../app/lib/types";
import Link from "next/link";

interface Props {
  users: User[];
  page: number;
  perPage: number;
  onSort: (key: keyof User, dir: "asc" | "desc") => void;
}

export default function UserTable({ users, page, perPage, onSort }: Props) {
  const start = (page - 1) * perPage;
  const visible = useMemo(
    () => users.slice(start, start + perPage),
    [users, start, perPage],
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((u) => (
            <tr
              key={u.id}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-4 py-2">{u.id}</td>
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.username}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/users/${u.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
