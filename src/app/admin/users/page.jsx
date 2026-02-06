
"use client";
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
          <User className="h-8 w-8 text-green-600" /> All Users
        </h2>
        {loading ? (
          <p className="text-lg text-gray-500 text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2 px-4 font-semibold">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
