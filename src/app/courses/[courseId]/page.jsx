"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Star, User, ChevronRight } from "lucide-react";

export default function CourseDetailsPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      const { courseId } = await params;

      if (!courseId) {
        setLoading(false);
        return;
      }

   
      fetch("/api/courses")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch courses");
          return res.json();
        })
        .then((data) => {
          console.log("All courses:", data.courses);
          console.log("Looking for courseId:", courseId);
          
          const found = (data.courses || []).find((c) => {
            const courseMatch = String(c._id) === String(courseId);
            console.log(`Checking ${c._id} vs ${courseId}: ${courseMatch}`);
            return courseMatch;
          });
          
          if (!found) {
            console.warn("Course not found. Available IDs:", data.courses?.map(c => c._id));
            setLoading(false);
            return;
          }

          setCourse(found);

       
          if (found._id) {
            return fetch(`/api/lessons?courseId=${found._id}`)
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch lessons");
                return res.json();
              })
              .then((data) => {
                setLessons(Array.isArray(data.lessons) ? data.lessons : []);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching course/lessons:", err);
          setLoading(false);
        });
    };

    unwrapParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">Course not found</p>
          <Link href="/courses" className="text-purple-600 hover:text-purple-700 font-semibold">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Courses
          </Link>
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-white/90 mt-3 max-w-2xl">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
          <div className="lg:col-span-2">
           
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <Clock className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="text-2xl font-bold text-gray-900">{course.duration || "12 hrs"}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600 text-sm">Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{lessons.length || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <p className="text-gray-600 text-sm">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{course.rating || "4.8"}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-6 w-6 text-purple-600 mb-2 text-lg">⭐</div>
                <p className="text-gray-600 text-sm">Points</p>
                <p className="text-2xl font-bold text-gray-900">{course.points || 100}</p>
              </div>
            </div>

         
            <div className="bg-white rounded-xl shadow p-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Instructor</h3>
                  <p className="text-gray-600">{course.instructor || "Expert Instructor"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Course Content ({lessons.length} lessons)</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <Link
                      key={lesson._id || index}
                      href={`/courses/${course._id}/lessons/${lesson._id || index}`}
                      className="p-6 hover:bg-purple-50 transition block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                          </div>
                          {lesson.description && (
                            <p className="text-gray-600 ml-11">{lesson.description}</p>
                          )}
                          {lesson.duration && (
                            <p className="text-sm text-gray-500 ml-11 mt-1">
                              ⏱️ {lesson.duration} minutes
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">No lessons available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-8 sticky top-4">
              <button
                onClick={() => setEnrolled(!enrolled)}
                className={`w-full py-3 rounded-lg font-bold text-lg transition mb-4 ${
                  enrolled
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {enrolled ? "✓ Enrolled" : "Enroll Now"}
              </button>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Course Level</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {course.tags?.[0] || "Beginner"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Topics</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {course.tags?.slice(1).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
