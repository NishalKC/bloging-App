import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

const Logout = ({ setIslogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await api.post("/user/logout");

        console.log(response.data);

        // Update Navbar immediately
        setIslogin(false);

        // Go to Login page
        navigate("/login");
      } catch (error) {
        console.log(error);

        // Even if backend logout fails,
        // update frontend state
        setIslogin(false);

        navigate("/login");
      }
    };

    handleLogout();
  }, [navigate, setIslogin]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl">
        Logging out...
      </h1>
    </div>
  );
};

export default Logout;