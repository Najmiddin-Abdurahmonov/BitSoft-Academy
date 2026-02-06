
"use client";
import React, { useEffect, useState } from "react";
import { Layers, PlusCircle } from "lucide-react";

const AdminLessons = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setLoading(true);
      fetch(`/api/lessons?courseId=${selectedCourse}`)
        .then((res) => res.json())
        .then((data) => {
          setLessons(data.lessons || []);
          setLoading(false);
        });
    } else {
      setLessons([]);
    }
  }, [selectedCourse]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: selectedCourse, title, content }),
    });
    const data = await res.json();
    if (data.success) {
      setLessons([...lessons, data.lesson]);
      setTitle("");
      setContent("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <Layers className="h-8 w-8 text-purple-600" /> Manage Lessons
        </h2>
        <label className="block mb-2 font-semibold">Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border p-3 rounded mb-6 text-lg w-full"
        >
          <option value="">-- Select a course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>
        {selectedCourse && (
          <>
            <form onSubmit={handleAddLesson} className="mb-8 flex flex-col gap-3 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Lesson Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-3 rounded text-lg"
              />
              <textarea
                placeholder="Lesson Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="border p-3 rounded text-lg"
              />
              <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded font-semibold hover:bg-purple-700 transition flex items-center gap-2 justify-center" disabled={loading}>
                <PlusCircle className="h-5 w-5" /> {loading ? "Adding..." : "Add Lesson"}
              </button>
            </form>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Content</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson, idx) => (
                    <tr key={lesson._id || idx} className="border-b">
                      <td className="py-2 px-4 font-semibold">{lesson.title}</td>
                      <td className="py-2 px-4">{lesson.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLessons;
