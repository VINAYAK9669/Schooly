import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../slices/authSlice";
import { logo } from "../data/fileImports";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("authToken");

    // Dispatch the action to reset the authentication state
    dispatch(resetState());

    // Redirect to the home page
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      const { name } = jwtDecode(localStorage.getItem("authToken"));
      setUserName(name);
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center fixed top-0 w-screen z-10">
      {/* LOGO */}
      <div className="text-2xl font-bold ">
        <img src={logo} loading="lazy" alt="logo" className="w-[150px]" />
      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-[2rem] ">
        <h3 className="">
          Welcome!{" "}
          <span className="font-bold">{userName ? userName : "Admin"}</span>
        </h3>
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav;
