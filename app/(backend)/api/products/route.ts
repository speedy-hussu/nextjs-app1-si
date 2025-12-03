import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/(backend)/lib/db";
import { Product } from "@/app/(backend)/lib/models/product.model";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { verifyAuth } from "@/app/(backend)/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(request);
    if (
      !authResult.isAuthenticated ||
      !authResult.user ||
      authResult.user.role !== "admin"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


// GET → fetch all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });

    // Convert MongoDB _id to id for frontend compatibility
    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      description: product.description,
      specifications: product.specifications,
      image: product.image || undefined,
    }));

    return NextResponse.json(formattedProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST → create new product
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);

    // Convert MongoDB _id to id for frontend compatibility
    const formattedProduct = {
      id: (newProduct as any)._id.toString(),
      name: (newProduct as any).name,
      category: (newProduct as any).category,
      description: (newProduct as any).description,
      specifications: (newProduct as any).specifications,
      image: (newProduct as any).image || undefined,
    };

    return NextResponse.json(formattedProduct, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
