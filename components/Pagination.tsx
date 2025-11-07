"use client";
import React from "react";

interface Props {
  page: number;
  total: number;
  perPage: number;
  onPage: (p: number) => void;
}

export default function Pagination({ page, total, perPage, onPage }: Props) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;

  const items = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center space-x-2 py-4">
      {items.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`rounded px-3 py-1 ${p === page ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
