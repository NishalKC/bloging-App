import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/Api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const userResponse = await api.get("/user/me");
      const blogsResponse = await api.get("/blog/myblogs");

      setUser(userResponse.data.user);
      setBlogs(blogsResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-zinc-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">

      {/* Profile Header */}
      <section className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 md:p-8">

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left flex-1">

            <h1 className="text-3xl font-bold">
              {user?.username}
            </h1>

            <p className="text-zinc-400 mt-2">
              {user?.email}
            </p>

            <p className="text-sm text-zinc-500 mt-2">
              Blogify member
            </p>

          </div>

          {/* Create Button */}
          <Link
            to="/create-blog"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2.5 rounded-lg transition"
          >
            + Create Blog
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-zinc-900 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold">
              {blogs.length}
            </p>

            <p className="text-zinc-400 mt-1">
              {blogs.length === 1 ? "Blog" : "Blogs"}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold">
              ✓
            </p>

            <p className="text-zinc-400 mt-1">
              Active
            </p>
          </div>

        </div>

      </section>

      {/* User Blogs */}
      <section className="mt-10">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Your Blogs
          </h2>

          <Link
            to="/dashboard"
            className="text-blue-400 hover:text-blue-300"
          >
            View All →
          </Link>

        </div>

        {blogs.length === 0 ? (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-10 text-center">

            <h3 className="text-xl font-semibold">
              No blogs yet
            </h3>

            <p className="text-zinc-400 mt-2 mb-5">
              Start writing your first blog.
            </p>

            <Link
              to="/create-blog"
              className="inline-block bg-blue-500 hover:bg-blue-600 px-5 py-2.5 rounded-lg transition"
            >
              Create Blog
            </Link>

          </div>
        ) : (
          <div className="space-y-3">

            {blogs.slice(0, 5).map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="block bg-zinc-800 border border-zinc-700 hover:border-blue-500 rounded-xl p-4 transition"
              >
                <div className="flex justify-between items-center gap-4">

                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">
                      {blog.category}
                    </p>
                  </div>

                  <span className="text-blue-400 shrink-0">
                    →
                  </span>

                </div>
              </Link>
            ))}

          </div>
        )}

      </section>

    </main>
  );
};

export default Profile;