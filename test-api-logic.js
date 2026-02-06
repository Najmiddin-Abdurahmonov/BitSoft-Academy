import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env.local") });

import mongoose from "mongoose";
import Course from "./src/lib/courses.js";
import Lesson from "./src/lib/lessons.js";

async function testCourseMatching() {
  try {
    console.log("🔍 Testing Course Matching Logic...\n");
    
    await mongoose.connect(process.env.MONGODB_URI);
    const courses = await Course.find({});
    const apiResponse = { courses };
    
    console.log("API Response Structure:");
    console.log(JSON.stringify(apiResponse, null, 2).slice(0, 500) + "...\n");
  
    const testIds = [
      courses[0]._id.toString(), 
      courses[0]._id,              
      "697ff3dbfa4bf42455f365fa", 
    ];
    
    console.log("Testing course matching:\n");
    testIds.forEach((testId, idx) => {
      const found = courses.find((c) => {
        const courseMatch = String(c._id) === String(testId);
        return courseMatch;
      });
      
      console.log(`Test ${idx + 1}: ${testId}`);
      console.log(`  Type: ${typeof testId}`);
      console.log(`  Found: ${found ? found.title : "NOT FOUND"}`);
      console.log();
    });
    
    
    console.log("Testing lesson fetching:\n");
    const firstCourseId = courses[0]._id;
    const lessons = await Lesson.find({ courseId: firstCourseId });
    console.log(`Lessons for ${courses[0].title}:`);
    console.log(`  Total: ${lessons.length}`);
    console.log(`  First 3:`);
    lessons.slice(0, 3).forEach((lesson) => {
      console.log(`    - ${lesson.title}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testCourseMatching();
