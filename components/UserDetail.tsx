"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "./UserForm";
import { User } from "../app/lib/types";

export default function UserDetail({ initial }: { initial: User }) {
  const [user, setUser] = useState<User>(initial);
  // read-only detail page (no edit by default)
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const onSave = undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Detail</h2>
        <div>
          <button
            onClick={() => router.push("/")}
            className="rounded border px-3 py-1"
            type="button"
          >
            Back
          </button>
        </div>
      </div>

      <UserForm user={user} onSave={onSave} editable={false} />
    </div>
  );
}
