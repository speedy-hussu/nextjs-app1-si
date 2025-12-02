import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { verifyAuth } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated || !authResult.user || authResult.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get("path");

    if (!imagePath) {
      return NextResponse.json(
        { error: "No image path provided" },
        { status: 400 }
      );
    }

    // Security: Only allow deletion of files in uploads directory
    if (!imagePath.startsWith("/uploads/")) {
      console.error("Invalid image path:", imagePath);
      return NextResponse.json(
        { error: "Invalid image path" },
        { status: 400 }
      );
    }

    // Construct the full file path
    const filepath = path.join(process.cwd(), "public", imagePath);
    
    console.log("Attempting to delete file:", filepath);

    // Check if file exists
    if (!existsSync(filepath)) {
      console.log("File not found:", filepath);
      // Return success even if file doesn't exist (idempotent operation)
      return NextResponse.json({
        success: true,
        message: "File already deleted or does not exist",
      });
    }

    // Delete the file
    await unlink(filepath);
    console.log("File deleted successfully:", filepath);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}