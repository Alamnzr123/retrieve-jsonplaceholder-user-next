import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/utils";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : null;
    if (!token)
      return NextResponse.json({ authenticated: false }, { status: 200 });
    const payload = await verifyToken(token);
    if (!payload)
      return NextResponse.json({ authenticated: false }, { status: 200 });
    return NextResponse.json(
      { authenticated: true, user: { email: payload.email } },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
