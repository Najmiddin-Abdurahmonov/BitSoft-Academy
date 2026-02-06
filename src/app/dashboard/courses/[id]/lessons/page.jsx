"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircle, BookOpen, Clock, CheckCircle, Lock, ArrowLeft } from "lucide-react";

export default function LessonsPage({ params }) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params;
      
      // Fetch course
      fetch("/api/courses")
        .then((res) => res.json())
        .then((data) => {
          const found = (data.courses || []).find((c) => c._id === id || c.id === parseInt(id));
          if (found) {
            setCourse(found);
            setLessons(found.lessons || []);
          }
          setLoading(false);
        });
    };
    unwrapParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex items-center justify-center">
        <div className="text-2xl text-purple-600 font-semibold animate-pulse">Loading lessons...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xl text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Link href={`/dashboard/courses/${course.id}`} className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8">
          <ArrowLeft className="h-5 w-5" />
          Back to Course
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-gray-600">
            Complete {lessons.length} lessons to master {course.title}
          </p>
          <div className="flex gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              {course.duration || "8 hours"}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              {lessons.length} lessons
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/dashboard/courses/${course.id}/lessons/${lesson.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-100 text-purple-600 font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Learn the essential concepts and skills for this topic
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        Video Lesson
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Quiz Included
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 font-semibold hover:bg-purple-200 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      Start Lesson
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700">No lessons available</h3>
            <p className="text-gray-500 mt-2">This course is being prepared</p>
          </div>
        )}
      </div>
    </div>
  );
}
