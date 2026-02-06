import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    // Check admin auth
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("adminAuth")?.value;

    if (!adminAuth) {
      return NextResponse.json(
        { error: "Unauthorized - Admin login required" },
        { status: 401 }
      );
    }

    // Courses are already in JSON storage, no seeding needed
    return NextResponse.json({
      success: true,
      message: "Courses are already loaded from JSON storage!"
    });
  } catch (error) {
    console.error("Error in seed endpoint:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

