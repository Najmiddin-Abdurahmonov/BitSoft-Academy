export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">You do not have permission to access this page.</p>
        <a href="/" className="text-blue-600 hover:underline">Go Home</a>
      </div>
    </div>
  );
}
