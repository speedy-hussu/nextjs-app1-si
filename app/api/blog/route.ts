import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/lib/models/blog.model";

// GET → fetch all blog posts
export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find().sort({ createdAt: -1 });

    const formatted = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      image: post.image || undefined,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST → create new blog post
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const created = await Blog.create(body);

    const formatted = {
      id: (created as any)._id.toString(),
      title: (created as any).title,
      excerpt: (created as any).excerpt,
      content: (created as any).content,
      author: (created as any).author,
      date: (created as any).date,
      category: (created as any).category,
      readTime: (created as any).readTime,
      image: (created as any).image || undefined,
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (err) {
    console.error("Error creating blog post:", err);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}



