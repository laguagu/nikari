import { SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const hardcodedEmail = "t@t";
  const hardcodedPassword = "t";

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, "email");
  try {
    if (email === hardcodedEmail && password === hardcodedPassword) {
      const user = { email, name: "Nikaridemo" };

      // Create the session
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiration to 1 day
      const session = await encrypt({ user, expires });

      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
      return true;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error: any) {
    console.log("Error in login function: ", error);
    revalidatePath("/login");
    return { error: error.message };
  } finally {
    console.log("Login function executed");
    revalidatePath("/");
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
