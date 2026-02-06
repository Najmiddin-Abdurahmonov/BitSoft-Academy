import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env.local") });

import Course from "./src/lib/courses.js";
import Lesson from "./src/lib/lessons.js";

async function testDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    const courses = await Course.find({});
    console.log(`\n📚 Found ${courses.length} courses:`);
    courses.forEach((course, idx) => {
      console.log(`  ${idx + 1}. ID: ${course._id} | Title: ${course.title}`);
    });

    if (courses.length > 0) {
      const firstCourse = courses[0];
      console.log(`\n📖 Getting lessons for course: ${firstCourse._id}`);
      const lessons = await Lesson.find({ courseId: firstCourse._id });
      console.log(`  Found ${lessons.length} lessons`);
      lessons.slice(0, 3).forEach((lesson, idx) => {
        console.log(`    ${idx + 1}. ${lesson.title}`);
      });
    }

    console.log("\n✅ Database test complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testDB();
