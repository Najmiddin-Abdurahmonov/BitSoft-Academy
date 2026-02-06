
"use client";
import React, { useState, useEffect } from "react";
import { BookOpenText, Trash2 } from "lucide-react";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
     
        setCourses((data.courses || []).filter((c) => c._id));
      });
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    if (data.success) {
      setCourses([...courses, data.course]);
      setTitle("");
      setDescription("");
    }
    setLoading(false);
  };

  const handleDeleteCourse = async (id) => {
    setLoading(true);
    const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setCourses(courses.filter((c) => c._id !== id));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <BookOpenText className="h-8 w-8 text-blue-600" /> Manage Courses
        </h2>
        <form onSubmit={handleAddCourse} className="mb-8 flex flex-col gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-3 rounded text-lg"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-3 rounded text-lg"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b">
                  <td className="py-2 px-4 font-semibold">{course.title}</td>
                  <td className="py-2 px-4">{course.description}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded transition"
                      disabled={loading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
