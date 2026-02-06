import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return default user data (no database storage needed)
    return NextResponse.json({ points: 0, completed: [], isPro: false });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ points: 0, completed: [], isPro: false });
  }
}