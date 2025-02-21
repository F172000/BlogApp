import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "public", "post.json");
const getPosts = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
export async function GET(request, context) {
  try {
    const { params } = context;
    const { title } = params;
    const post = getPosts().find((post) => post?.title === title);
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
