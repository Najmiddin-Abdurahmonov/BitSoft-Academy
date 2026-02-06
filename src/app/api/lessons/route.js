import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import lessonsData from "@/data/lessons.json";

export async function GET(req) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    
    if (!courseId) {
      return NextResponse.json({ lessons: [] });
    }

    // Return lessons from JSON
    const jsonLessons = lessonsData.lessons[courseId] || [];
    return NextResponse.json({ lessons: jsonLessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json({ lessons: [], error: error.message }, { status: 500 });
  }
}
