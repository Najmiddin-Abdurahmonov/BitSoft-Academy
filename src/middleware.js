import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

const isAdminLoginRoute = createRouteMatcher([
  "/admin/login",
]);

const isCoursesRoute = createRouteMatcher([
  "/courses(.*)",
  "/dashboard(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/blog(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminLoginRoute(req)) {
    return NextResponse.next();
  }

  if (isAdminRoute(req)) {
    const adminAuth = req.cookies.get("adminAuth")?.value;

    if (!adminAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Protect courses route - require authentication
  if (isCoursesRoute(req) && !isPublicRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: [
   
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  
    "/(api|trpc)(.*)",
  ],
};
