import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const referer = req.headers.get("referer") ?? "/";
  const url = new URL(referer);
  url.searchParams.set("suscrito", "1");
  return NextResponse.redirect(url, { status: 303 });
}
