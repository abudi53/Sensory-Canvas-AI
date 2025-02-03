import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serverClient } from "@/lib/server-client";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (refreshToken) {
    const refreshResponse = await serverClient({
      endpoint: "/token/refresh/",
      method: "POST",
      body: { refresh: refreshToken },
    });
    if (refreshResponse.ok) {
      const { access } = await refreshResponse.json();
      const res = NextResponse.next();
      res.cookies.set("access_token", access, {
        httpOnly: true,
        path: "/",
      });
      return res;
    } else {
      // If refresh fails, redirect to sign-in page.
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/generate-art", "/saved-art"],
};
