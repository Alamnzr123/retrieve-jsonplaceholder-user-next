import { NextResponse } from "next/server";

// Simple in-memory store for edits during dev server lifetime
const store = new Map<string, any>();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const body = await req.json();
    // merge into store
    const existing = store.get(id) || {};
    store.set(id, { ...existing, ...body });
    return NextResponse.json({ success: true, user: store.get(id) });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const user = store.get(id) || null;
  return NextResponse.json({ user });
}
