import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout";
import CreateBlog from "./Pages/Createblog";
import BlogDetails from "./Pages/BlogDetails";
import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import UpdateBlog from "./Pages/UpdateBlog"
import Notfound from "./Pages/Notfound"

import api from "./services/Api";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./Pages/Profile";

function App() {
  const [islogin, setIslogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const checklogin = async () => {
  try {
    const response = await api.get("/user/me");

    if (response.data.user) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  } catch (error) {
    setIslogin(false);
    console.log(error);
  } finally {
    setAuthLoading(false);
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checklogin();
  }, []);

  if (authLoading) {
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center text-white">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  );
}
  return (
    <BrowserRouter>
      <Navbar islogin={islogin} />

      <div className="bg-zinc-900 min-h-screen w-full text-white">
        <Routes>
          <Route
            path="/"
            element={
              <Home />
              }
          />
          <Route
          path="/update/:id"
          element={
            <ProtectedRoutes islogin={islogin}>
          <UpdateBlog/>
            </ProtectedRoutes>
        }
          />
          <Route path="*" element={<Notfound/>}/>
          <Route
              path="/profile"
              element={
                <ProtectedRoutes islogin={islogin}>
                  <Profile />
                </ProtectedRoutes>
              }
            />
          <Route
            path="/login"
            element={<Login setIslogin={setIslogin} />}
          />

          <Route
            path="/logout"
            element={<Logout setIslogin={setIslogin} />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route path="/dashboard" element={
            <ProtectedRoutes islogin={islogin}> 
            <Dashboard />
            </ProtectedRoutes>
            } />
          <Route
            path="/create-blog"
            element={
              <ProtectedRoutes islogin={islogin}>
                <CreateBlog />
              </ProtectedRoutes>
          }
          />

          <Route
            path="/blog/:id"
            element={<BlogDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;