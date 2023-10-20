import jwtDecode from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { authPaths, protectedPaths } from "./constants";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt");
  const user = token ? jwtDecode(token.value) : null;
  const url = req.nextUrl;

  if (url.pathname == "/") {
    return NextResponse.redirect(url.origin + "/feed");
  }

  if (user && authPaths.includes(url.pathname)) {
    return NextResponse.redirect(url.origin + "/feed");
  }

  if (!user && protectedPaths.includes(url.pathname)) {
    return NextResponse.redirect(url.origin + "/login");
  }
}
