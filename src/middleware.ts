// import { clerkMiddleware } from "@clerk/nextjs/server";
import { updateSession } from "@/lib/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Update Supabase session if needed
  const supabaseResponse = await updateSession(request);
  
  // Protect routes based on authentication
  // For now, allow public access to basic routes
  
  return supabaseResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
