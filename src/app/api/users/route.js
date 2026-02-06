import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return empty users list (no database storage)
    return NextResponse.json({ users: [] });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ users: [], error: error.message }, { status: 500 });
  }
}
