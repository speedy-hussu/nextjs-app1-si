import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/(backend)/lib/db";
import { User } from "@/app/(backend)/lib/models/user.model";
import { verifyAuth, isAdmin } from "@/app/(backend)/lib/auth";
import { sendBulkEmail } from "@/app/(backend)/lib/email";

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated || !isAdmin(authResult.user)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { subject, html, text } = await request.json();

    if (!subject || typeof subject !== "string") {
      return NextResponse.json(
        { message: "Subject is required" },
        { status: 400 }
      );
    }

    if (!html && !text) {
      return NextResponse.json(
        { message: "Email content is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const subscribers = await User.find({}, { email: 1, _id: 0 }).lean();

    if (!subscribers.length) {
      return NextResponse.json(
        { message: "No subscribers found." },
        { status: 400 }
      );
    }

    const emails = subscribers.map((s: { email: string }) => s.email);

    await sendBulkEmail({
      subject,
      html,
      text,
      bcc: emails,
    });

    return NextResponse.json(
      { message: `Newsletter sent to ${emails.length} subscribers.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      { message: "Failed to send newsletter." },
      { status: 500 }
    );
  }
}
