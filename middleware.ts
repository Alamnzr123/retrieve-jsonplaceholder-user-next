import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Allow public routes
  const publicPaths = [
    "/login",
    "/api/auth/login",
    "/api/data/posts",
    "/api/data/users",
  ];
  if (publicPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
export const config = {
  // specify which paths to run middleware on
  matcher: ["/users/:path*", "/", "/posts", "/"],
};
