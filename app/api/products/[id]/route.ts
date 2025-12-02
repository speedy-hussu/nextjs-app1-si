import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product.model";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

// GET /api/products/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Convert MongoDB _id to id for frontend compatibility
    const formattedProduct = {
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      description: product.description,
      specifications: product.specifications,
      image: product.image || undefined,
    };
    
    return NextResponse.json(formattedProduct);
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PATCH /api/products/:id
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Convert MongoDB _id to id for frontend compatibility
    const formattedProduct = {
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      category: updatedProduct.category,
      description: updatedProduct.description,
      specifications: updatedProduct.specifications,
      image: updatedProduct.image || undefined,
    };
    
    return NextResponse.json(formattedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete associated image file from disk (if present)
    if (deletedProduct.image) {
      try {
        const imagePath =
          deletedProduct.image.startsWith("/")
            ? deletedProduct.image.slice(1)
            : deletedProduct.image;
        const absolutePath = path.join(process.cwd(), "public", imagePath);

        if (existsSync(absolutePath)) {
          await unlink(absolutePath);
        }
      } catch (fileErr) {
        console.error("Error deleting product image file:", fileErr);
        // Do not fail the API just because file deletion failed
      }
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
