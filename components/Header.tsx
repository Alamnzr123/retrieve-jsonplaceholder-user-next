"use client";

import React from "react";
import SearchList from "../components/SearchList";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function Header({ onSearch }: any) {
  const [user, setUser] = React.useState<{ email?: string } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const handleSearch = (text: string) => {
    // if parent passed a handler, call it; otherwise we could implement client-side behavior here
    if (typeof onSearch === "function") onSearch(text);
  };

  const pathname = usePathname();

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("/api/auth/me")
      .then((res) => {
        if (!mounted) return;
        if (res.data?.authenticated) setUser(res.data.user);
        else setUser(null);
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      router.push("/login");
    }
  };

  return (
    <header className="z-40 w-full bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="hidden sm:block">
            <SearchList onSearch={handleSearch} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {loading ? null : user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-200">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="text-sm text-blue-600">
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
