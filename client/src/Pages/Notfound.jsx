import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="text-center">

        <h1 className="text-8xl font-bold text-blue-500">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-zinc-400 mt-3 mb-8">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition"
        >
          ← Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;