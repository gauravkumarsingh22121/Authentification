import React, { useContext, useState } from "react";
import axios from "axios";
import dp from "../assets/dp.png";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { serverUrl, userData, setUserData, getUserData } =
    useContext(dataContext);

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let { data } = await axios.post(
        serverUrl + "/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // If your login API returns the user
      setUserData(data.user);

      // Get fresh user data from backend
      await getUserData();

      // Navigate after successful login
      navigate("/home");

      console.log(data);
    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] bg-[#141f1f] rounded-xl flex flex-col items-center p-8">
        <h1 className="text-white text-3xl font-semibold mb-8">
          Login
        </h1>

        <form
          className="w-full flex flex-col items-center gap-5"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-white rounded-lg px-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-white rounded-lg px-4 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p
            className="text-white cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Want to Create new account ?{" "}
            <span className="text-[#0ed3e1]">SignUp</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;