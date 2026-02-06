import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  videoId: { type: String }, // YouTube video ID
  duration: { type: Number }, // Duration in minutes
  order: { type: Number }, // Lesson order in course
  resources: [{ name: String, url: String }], // Additional resources
  quiz: [{
    question: String,
    options: [String],
    answer: String,
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
