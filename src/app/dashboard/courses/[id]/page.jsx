"use client";

import React, { useEffect, useState } from "react";
import { Clock, BookOpen, User, PlayCircle, CheckCircle, Lock, Star } from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params;
      // Fetch course
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          const found = (data.courses || []).find((c) => c._id === id || c.id === parseInt(id));
          setCourse(found);
          
          // Fetch lessons for this course
          if (found && found._id) {
            fetch(`/api/lessons?courseId=${found._id}`)
              .then((res) => res.json())
              .then((data) => {
                setLessons(data.lessons || []);
              });
          }
        });
    };
    unwrapParams();
  }, [params]);

  if (!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            {course.title}
          </h1>
          <p className="text-xl text-gray-600 mt-6 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-8 mt-8 text-gray-600">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-purple-600" />
              <span className="font-medium">{course.instructor || "Expert Instructor"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-purple-600" />
              <span className="font-medium">{course.duration || "8 hours"}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="font-medium">{course.lessons || 10} lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="font-medium">{course.rating || 4.8} rating</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {course.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-800 font-bold px-5 py-2.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setEnrolled(!enrolled)}
            disabled={loading}
            className={`mt-8 px-8 py-3 rounded-lg font-semibold transition ${
              enrolled
                ? "bg-green-600 text-white"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {loading ? "Processing..." : enrolled ? "Enrolled ✓" : "Enroll in Course"}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Content</h2>

          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                return (
                  <Link
                    key={lesson._id || index}
                    href={`/dashboard/courses/${course._id || course.id}/lessons/${lesson._id || index}`}
                    className="block p-6 rounded-2xl border-2 bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <PlayCircle className="h-8 w-8 text-purple-600" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {index + 1}. {lesson.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {lesson.duration || 45} minutes • Video + Quiz
                          </p>
                          <p className="text-gray-600 text-sm mt-2">{lesson.content}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                Loading lessons... 🎓
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}