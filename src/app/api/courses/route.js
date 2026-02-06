import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import coursesData from "@/data/courses.json";

export async function GET(req) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ courses: coursesData.courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ courses: coursesData.courses });
  }
}
