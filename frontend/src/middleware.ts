import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Define paths to exclude from middleware (static files, API routes, etc.)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Public routes
  const publicRoutes = ["/login", "/register"];

  // If user is authenticated and tries to access public routes, redirect to dashboard
  if (accessToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protected routes
  // if (!accessToken && !publicRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Specify the routes where middleware should apply
export const config = {
  matcher: [
    /*
     * Apply middleware to all routes except:
     * - Next.js internal routes (_next/*)
     * - Static files (/static/*)
     * - API routes (/api/*)
     * - Favicon (/favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico|api|static).*)",
  ],
};
