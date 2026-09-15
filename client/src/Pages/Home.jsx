
import { useEffect, useState } from "react";
import api from "../services/Api";
import Blog from "../components/Blog";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and category
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  // Get all blogs
  const getBlogs = async () => {
    try {
      const response = await api.get("/blog");
      setBlogs(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBlogs();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  // Search + category filter
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.category === category;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <h1 className="text-2xl">Loading blogs...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Latest Blogs
        </h1>

        <p className="text-zinc-400">
          Discover interesting blogs from our community.
        </p>
      </div>

      {/* Search + Category */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 bg-zinc-800 px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-zinc-800 px-5 py-3 rounded-lg outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      {currentBlogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No blogs found
          </h2>

          <p className="text-zinc-400 mt-2">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">

          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-zinc-800 rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500"
                  : "bg-zinc-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-zinc-800 rounded-lg disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default Home;
