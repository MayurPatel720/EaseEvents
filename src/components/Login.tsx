import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:8000/user/login", {
      username,
      password,
    });
    if (res.status === 200) {
      console.log("Successfully login!");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div
        style={{ backgroundColor: "#1C3B62" }}
        className="w-full md:w-1/2 text-white flex flex-col justify-center items-center p-8"
      >
        <h1 className="text-white text-4xl text-center font-bold mb-4">
          Welcome to <span className="text-yellow-300">EaseEvents</span>
        </h1>
        <p className="text-base mt-4 text-white text-center">
          Where Every Moment Becomes Effortless.
          <br /> Log In to
          <span className="text-yellow-300">
            {" "}
            Create, Manage, and Celebrate!
          </span>
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form method="post" onSubmit={handlesubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
