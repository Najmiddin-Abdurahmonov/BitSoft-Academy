import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  language: { type: String, default: "en", enum: ["en", "ru", "uz"] },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  totalPoints: { type: Number, default: 0 },
  completedLessons: [
    {
      lessonId: { type: mongoose.Schema.Types.ObjectId },
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      pointsEarned: { type: Number, default: 10 },
      completedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
