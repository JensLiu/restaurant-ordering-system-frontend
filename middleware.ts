import { NextRequest, NextResponse } from "next/server";
import { roleCookieName } from "./app/hooks/useUserStore";
import { Role } from "./types/UserTypes";

export async function middleware(req: NextRequest) {

    // get role in cookies (set by useUserStore)
    const role = req.cookies.get(roleCookieName)?.value as Role | undefined;

    // redirect to home page of the user's role
    if (req.url.match(/http:\/\/[^/]+\/$/)) {
        // <home> ::= http:// <baseUrl> /
        // <baseUrl> ::= <anything but /> <baseUrl> | epsilon
        if (role == "CUSTOMER") {
            return NextResponse.redirect(new URL("/home", req.url));
        } else if (role == "CHEF") {
            return NextResponse.redirect(new URL("/chef", req.url));
        } else if (role == "ADMIN") {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
        return NextResponse.redirect(new URL("/home", req.url));
    }

    // redirect to home page if user is not authenticated or not in the right role
    if (req.url.includes("/admin") && role != "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.url.includes("/chef") && role != "CHEF") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.url.includes("/me") && role == undefined) {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    // specify when the middleware should run
    matcher: ["/", "/admin/:path*", "/chef/:path*", "/me/:path*"],
};
