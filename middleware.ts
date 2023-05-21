import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/lib/auth";

export async function middleware(req: NextRequest) {
    // const token = req.cookies.get("access-token")?.value;

    // const verifiedToken =
    //     token &&
    //     (await verifyAuth(token).catch((err) => {
    //         console.log(err);
    //     }));

    // if (req.nextUrl.pathname.startsWith('/') && !verifiedToken) {
    //     return;
    // }

    // if (req.url.includes('/login') && verifiedToken) {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    // if (!verifiedToken) {
    //     console.log("request url", req.url);
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

}

export const config = {
    // specify when the middleware should run
    matcher: ["/profile/:path*", "/login/:path*"],
};