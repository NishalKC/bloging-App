import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/Api";
import Blog from "../components/Blog";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBlogs = async () => {
    try {
      const response = await api.get("/blog/myblogs");
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMyBlogs();
  }, []);

  const handleDelete = (deletedId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog._id !== deletedId)
    );
  };

 if (loading) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <p className="text-xl text-zinc-400">
        Loading your blogs...
      </p>
    </div>
  );
}

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            My Blogs
          </h1>

          <p className="text-zinc-400 mt-2">
            {blogs.length}{" "}
            {blogs.length === 1 ? "blog" : "blogs"} published
          </p>
        </div>

        <Link
          to="/create-blog"
          className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg text-center font-medium transition"
        >
          + Create Blog
        </Link>

      </div>

      {/* Empty State */}
      {blogs.length === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center">

          <div className="text-center max-w-md">

            <div className="text-6xl mb-5">
              📝
            </div>

            <h2 className="text-2xl font-bold mb-3">
              You haven't published anything yet
            </h2>

            <p className="text-zinc-400 mb-6">
              Start sharing your ideas with the Blogify community.
            </p>

            <Link
              to="/create-blog"
              className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium transition"
            >
              Create Your First Blog
            </Link>

          </div>

        </div>
      ) : (

        /* Blog Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              showActions={true}
              onDelete={handleDelete}
            />
          ))}

        </div>

      )}

    </main>
  );
};

export default Dashboard;