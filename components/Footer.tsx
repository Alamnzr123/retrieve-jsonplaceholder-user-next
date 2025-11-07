import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t bg-white p-4 text-center text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div>© {new Date().getFullYear()} My Dashboard</div>
    </footer>
  );
}
