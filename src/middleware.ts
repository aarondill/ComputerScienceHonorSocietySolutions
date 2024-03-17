import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Ensure that /public files with ?download are served with `Content-Disposition: attachment`.
// Technically, this allows any file with ?download to be downloaded, but
// that's okay since the user can use ctrl+s anyways
export function middleware(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("download")) return;
  const response = NextResponse.next();
  response.headers.set("Content-Disposition", "attachment");
  return response;
}

export const config = {
  matcher: "/solutions/(.*)",
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
