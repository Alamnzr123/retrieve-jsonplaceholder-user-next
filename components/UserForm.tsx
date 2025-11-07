"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { User } from "../app/lib/types";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required"),
  })
  .required();

type FormValues = {
  name: string;
  email: string;
  username: string;
};

export default function UserForm({
  user,
  onSave,
  editable = false,
}: {
  user: User;
  onSave?: (u: User) => void;
  editable?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
    },
  });

  const submit = async (data: FormValues) => {
    const updated = { ...user, ...data } as User;
    if (typeof onSave === "function") {
      onSave(updated);
    } else {
      try {
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        // short success UX could be added here
      } catch (err) {
        console.error("Failed to save user", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input
          {...register("name")}
          className="w-full rounded border px-2 py-1"
          readOnly={!editable}
        />
        <p className="text-xs text-red-600">{(errors as any)?.name?.message}</p>
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          {...register("email")}
          className="w-full rounded border px-2 py-1"
          readOnly={!editable}
        />
        <p className="text-xs text-red-600">
          {(errors as any)?.email?.message}
        </p>
      </div>
      <div>
        <label className="block text-sm">Username</label>
        <input
          {...register("username")}
          className="w-full rounded border px-2 py-1"
          readOnly={!editable}
        />
        <p className="text-xs text-red-600">
          {(errors as any)?.username?.message}
        </p>
      </div>
      <div>
        {editable ? (
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        ) : null}
      </div>
    </form>
  );
}
