import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/Api";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBlog = async () => {
    try {
      const response = await api.get(`/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Failed to load blog"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-xl text-zinc-400">
          Loading blog...
        </p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">
          Blog not found
        </h1>

        <p className="text-zinc-400 mb-6">
          {error || "This blog does not exist."}
        </p>

        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-block text-zinc-400 hover:text-white mb-8 transition"
      >
        ← Back to blogs
      </Link>

      {/* Article */}
      <article>

        {/* Category */}
        <span className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-sm mb-5">
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-wrap items-center gap-4 text-zinc-400 mb-8">
          <span>
            By{" "}
            <span className="text-white font-medium">
              {blog.author?.name || "Unknown"}
            </span>
          </span>

          <span>•</span>

          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full max-h-125 object-cover rounded-2xl mb-10"
          />
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-sm text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="text-zinc-300 text-lg leading-8 whitespace-pre-line">
          {blog.content}
        </div>

      </article>
    </main>
  );
};

export default BlogDetails;