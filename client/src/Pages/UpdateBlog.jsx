import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/Api";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    coverImage: null,
  });

  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get existing blog
  const getBlog = async () => {
    try {
      const response = await api.get(`/blog/${id}`);

      const blog = response.data;

      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        category: blog.category || "",
        tags: blog.tags?.join(", ") || "",
        coverImage: null,
      });

      setCurrentImage(blog.coverImage || "");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to load blog"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBlog();
  }, [id]);

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));

    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeNewImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: null,
    }));

    setPreview(null);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      return setError("Blog title is required");
    }

    if (formData.title.trim().length < 5) {
      return setError("Title must be at least 5 characters");
    }

    if (!formData.content.trim()) {
      return setError("Blog content is required");
    }

    if (formData.content.trim().length < 20) {
      return setError("Content must be at least 20 characters");
    }

    if (!formData.category.trim()) {
      return setError("Category is required");
    }

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("tags", formData.tags);

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      await api.put(`/blog/update/${id}`, data);

      setSuccess("Blog updated successfully!");

      setTimeout(() => {
        navigate(`/blog/${id}`);
      }, 1200);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to update blog"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-xl text-zinc-400">
          Loading blog...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Edit Blog
        </h1>

        <p className="text-zinc-400">
          Update your blog and keep your content fresh.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 md:p-8"
      >

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />

          <p className="text-xs text-zinc-500 mt-2">
            {formData.title.length} characters
          </p>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition"
          />

          <p className="text-xs text-zinc-500 mt-2">
            Separate tags with commas
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-300 mb-2">
            Content
          </label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="12"
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg outline-none focus:border-blue-500 transition resize-y"
          />

          <p className="text-xs text-zinc-500 mt-2">
            {formData.content.length} characters
          </p>
        </div>

        {/* Existing Image */}
        {currentImage && !preview && (
          <div className="mb-6">
            <p className="text-sm text-zinc-300 mb-2">
              Current Cover Image
            </p>

            <img
              src={`${import.meta.env.VITE_API_URL}/${currentImage}`}
              alt="Current cover"
              className="w-full max-h-80 object-cover rounded-xl"
            />
          </div>
        )}

        {/* New Image */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-300 mb-2">
            Change Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg text-zinc-400"
          />

          <p className="text-xs text-zinc-500 mt-2">
            Leave empty to keep the current image. Maximum size: 5MB.
          </p>

          {/* New Image Preview */}
          {preview && (
            <div className="mt-5 relative">
              <img
                src={preview}
                alt="New cover preview"
                className="w-full max-h-80 object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={removeNewImage}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-sm"
              >
                Cancel New Image
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="submit"
            disabled={updating}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition"
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/blog/${id}`)}
            className="sm:w-32 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-lg transition"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
};

export default UpdateBlog;