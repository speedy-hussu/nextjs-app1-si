import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/(backend)/lib/db";
import { User } from "@/app/(backend)/lib/models/user.model";

export async function GET() {
  try {
    await connectDB();
    const count = await User.countDocuments();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json(
      { message: "Failed to fetch user count." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    await connectDB();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed." },
        { status: 409 }
      );
    }

    await User.create({ email: normalizedEmail });

    return NextResponse.json(
      { message: "Subscribed successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing user:", error);
    return NextResponse.json(
      { message: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
