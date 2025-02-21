import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "public", "post.json");
const getPosts = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
export async function GET() {
  try {
    const posts = getPosts();
    const response= NextResponse.json(posts);
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=120"
    );
    return response;
    
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
