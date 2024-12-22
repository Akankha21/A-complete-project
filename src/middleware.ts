import { NextResponse } from "next/server";
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.yoursite.com", "https://yoursite.come"]
    : ["http://localhost:3000", "https://www.edge.com"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  console.log(origin);

  if ((origin && !allowedOrigins.includes(origin)) || !origin) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  console.log("middleware!");
  console.log(request.method);
  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
