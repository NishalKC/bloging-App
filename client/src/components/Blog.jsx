import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/Api";

const Blog = ({ blog, showActions = false, onDelete }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/user/me");
      setCurrentUser(response.data.user);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCurrentUser();
  }, []);

  const isOwner =
    currentUser &&
    blog.author?._id &&
    currentUser._id === blog.author._id;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/blog/delete/${blog._id}`);

      if (onDelete) {
        onDelete(blog._id);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Failed to delete blog"
      );
    }
  };

  return (
    <article className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 hover:border-blue-500 transition duration-300 hover:-translate-y-1">

      {/* Cover Image */}
      {blog.coverImage ? (
        <Link to={`/blog/${blog._id}`}>
          <img
            src={`${import.meta.env.VITE_API_URL}/${blog.coverImage}`}
            alt={blog.title}
            className="w-full h-52 object-cover hover:scale-105 transition duration-500"
          />
        </Link>
      ) : (
        <div className="w-full h-52 bg-zinc-700 flex items-center justify-center">
          <span className="text-zinc-400">
            No Image
          </span>
        </div>
      )}

      <div className="p-5">

        {/* Category */}
        <span className="inline-block text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full mb-3">
          {blog.category}
        </span>

        {/* Title */}
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-blue-400 transition line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        {/* Content */}
        <p className="text-zinc-400 line-clamp-3 leading-relaxed">
          {blog.content}
        </p>

        {/* Author + Date */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-zinc-700">

          <div>
            <p className="text-sm text-zinc-300">
              By {blog.author?.name || "Unknown"}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Read →
          </Link>

        </div>

        {/* Actions */}
        {showActions && isOwner && (
          <div className="flex gap-3 mt-5 pt-4 border-t border-zinc-700">

            <Link
              to={`/update/${blog._id}`}
              className="flex-1 text-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Delete
            </button>

          </div>
        )}

      </div>
    </article>
  );
};

export default Blog;