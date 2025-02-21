import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post.json`);
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    const posts = await res.json();
    const response = NextResponse.json(posts);
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=120"
    );
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
