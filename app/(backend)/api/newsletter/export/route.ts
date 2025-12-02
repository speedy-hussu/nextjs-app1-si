import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/(backend)/lib/db";
import { User } from "@/app/(backend)/lib/models/user.model";
import { verifyAuth, isAdmin } from "@/app/(backend)/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Step 1: Validate admin authentication
    const authResult = await verifyAuth(request);

    // If user is not logged in or not admin → deny access
    if (!authResult.isAuthenticated || !isAdmin(authResult.user)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Step 2: Connect to MongoDB
    await connectDB();

    // Step 3: Fetch ONLY the email field from User collection
    // { email: 1, _id: 0 } → include email, exclude _id
    const subscribers = await User.find({}, { email: 1, _id: 0 }).lean();

    // If no subscribers exist
    if (!subscribers.length) {
      return NextResponse.json(
        { message: "No subscribers found." },
        { status: 404 }
      );
    }

    // Step 4: CSV Header (only one column)
    const csvHeader = "Email\n";

    // Step 5: Convert subscribers to CSV rows
    const csvRows = subscribers.map((user: { email: string }) => {
      const email = user.email || "";

      // Escape commas or quotes to avoid breaking CSV structure
      const escapedEmail =
        email.includes(",") || email.includes('"')
          ? `"${email.replace(/"/g, '""')}"`
          : email;

      // Only return email row
      return `${escapedEmail}`;
    });

    // Combine header + rows
    const csvContent = csvHeader + csvRows.join("\n");

    // Step 6: Return CSV as downloadable file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        // Auto-generate filename with today's date
        "Content-Disposition": `attachment; filename="newsletter-emails-${
          new Date().toISOString().split("T")[0]
        }.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting newsletter subscribers:", error);

    // Step 7: Handle unexpected errors
    return NextResponse.json(
      { message: "Failed to export subscribers." },
      { status: 500 }
    );
  }
}
