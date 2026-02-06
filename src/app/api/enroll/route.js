import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return NextResponse.json({ success: false, message: "Missing userId or courseId" }, { status: 400 });
    }

    // Return success response (no database storage)
    return NextResponse.json({ success: true, user: { id: userId, enrolledCourses: [courseId] } });
  } catch (error) {
    console.error("Error enrolling user:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return NextResponse.json({ success: false, message: "Missing userId or courseId" }, { status: 400 });
    }

    // Return success response (no database storage)
    return NextResponse.json({ success: true, user: { id: userId, enrolledCourses: [] } });
  } catch (error) {
    console.error("Error unenrolling user:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
