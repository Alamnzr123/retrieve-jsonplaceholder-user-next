import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "@k325SECRET"
);

export async function generateToken(payload: {
  email: string,
  password : string
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("3d")
    .sign(secret);
}

export async function verifyToken(
  token: string
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string };
  } catch (error) {
    return null;
  }
}