import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product.model";

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
