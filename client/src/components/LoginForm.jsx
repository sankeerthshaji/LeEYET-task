import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const inputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password);
  };
  return (
    <div className="flex justify-center h-screen items-center bg-gray-50">
      <div className="w-80 sm:w-96 shadow-2xl px-5 py-6 bg-white">
        <div className="grid gap-8">
          <div className="grid gap-2">
            <div className="text-2xl font-bold">Welcome back</div>
            <div className="text-sm font-light text-gray-500">
              Welcome back! Please enter your details
            </div>
          </div>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <input
                ref={inputRef}
                className="w-full border-2 border-gray-300 p-2 rounded-md"
                type="text"
                name="userName"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <input
                className="w-full border-2 border-gray-300 p-2 rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex">
              <div>
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  id="checkbox"
                  defaultChecked
                />
                <label
                  className="text-sm font-light text-gray-500 cursor-pointer"
                  htmlFor="checkbox"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md transform hover:scale-105 transition duration-300">
                {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
