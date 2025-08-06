import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;

  const pathname = request.nextUrl.pathname;

  // Define public paths that don't require auth or redirect
  const publicPaths = [
    "/secure_admin/login",
    "/secure_admin/favicon.ico",
    "/secure_admin/api",
    "/secure_admin/_next",
    "/secure_admin/logo.jpg",
    "/secure_admin/.well-known", // <== important for devtools & other well-known URLs
  ];

  // Check if the request pathname starts with any public path
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  // Redirect logged-in users away from login page to home
  if (token && pathname === "/secure_admin/login") {
    console.log("Redirecting logged-in user from /login to /");
    return NextResponse.redirect(new URL("/secure_admin", request.url));
  }

  // Redirect not-logged-in users trying to access protected routes to login
  if (!token && !isPublic) {
    console.log("Redirecting not logged-in user to /login");
    return NextResponse.redirect(new URL("/secure_admin/login", request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|doaibu-logo-transparent.png|\\.well-known).*)",
  ],
};
