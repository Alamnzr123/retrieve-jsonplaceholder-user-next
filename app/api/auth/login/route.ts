import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../../lib/utils";

export async function POST(req: NextRequest) {
  const body: any = await req.json();
  const email = body?.email;
  const password = body?.password;

  console.log("POST /api/auth/login attempt for:", email);

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  if (email === "testuser" && password === "testpass") {
    const token = await generateToken({
      email: "testuser",
      password: "testpass",
    });
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      sameSite: "strict",
      path: "/",
    });
    console.log("Login successful, token set for", email);
    return response;
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
