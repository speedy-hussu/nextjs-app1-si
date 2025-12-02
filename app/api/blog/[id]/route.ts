import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/lib/models/blog.model";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

// GET /api/blog/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const post = await Blog.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const formatted = {
      id: post._id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      readTime: post.readTime,
      image: post.image || undefined,
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PATCH /api/blog/:id
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();
    const updated = await Blog.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const formatted = {
      id: updated._id.toString(),
      title: updated.title,
      excerpt: updated.excerpt,
      content: updated.content,
      author: updated.author,
      date: updated.date,
      category: updated.category,
      readTime: updated.readTime,
      image: updated.image || undefined,
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error updating blog post:", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/:id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete associated image file from disk (if present)
    if (deleted.image) {
      try {
        const imagePath =
          deleted.image.startsWith("/")
            ? deleted.image.slice(1)
            : deleted.image;
        const absolutePath = path.join(process.cwd(), "public", imagePath);

        if (existsSync(absolutePath)) {
          await unlink(absolutePath);
        }
      } catch (fileErr) {
        console.error("Error deleting blog image file:", fileErr);
        // Keep API successful even if file deletion fails
      }
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog post:", err);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}



