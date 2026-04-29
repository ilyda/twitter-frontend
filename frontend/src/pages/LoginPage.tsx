import { useState } from "react";
import twitterLogo from "../assets/twitter.png";
import socialMedia from "../assets/social-media.svg";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

type ErrorType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};
type Props = {
  setIsAuth: (val: boolean) => void;
};
export default function LoginPage({ setIsAuth }: Props) {
  
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorType>({});

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ---------------- INPUT HANDLERS ----------------
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // ---------------- VALIDATION ----------------
  const validateLogin = () => {
    const err: ErrorType = {};
    if (!loginData.email) err.email = "Email is required";
    if (!loginData.password) err.password = "Password is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateRegister = () => {
    const err: ErrorType = {};

    if (!registerData.firstName) err.firstName = "First name is required";
    if (!registerData.lastName) err.lastName = "Last name is required";
    if (!registerData.email) err.email = "Email is required";
    if (!registerData.password || registerData.password.length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------- LOGIN ----------------
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLogin()) return;

  e.preventDefault();
    if (!validateLogin()) return;

    try {
      const res = await API.post("/auth/login", loginData);
      const data = res.data;

      localStorage.setItem("userID", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      setIsAuth(true); // ✅ App'i yeniden render ettirir
      setTimeout(() => navigate("/"), 1000);

    } catch {
      setErrors({ password: "Invalid email or password" });
    }
  };

  // ---------------- REGISTER ----------------
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegister()) return;

    try {
      await API.post("/auth/register", registerData);

      setActiveTab("login");
      setErrors({});

    } catch {
      setErrors({ email: "Registration failed" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* LEFT SIDE */}
      <div className="hidden md:flex md:w-1/2 bg-[#1d9bf0] text-white flex-col justify-center items-start px-20">
        <h1 className="text-[48px] font-extrabold leading-tight mb-6">
          See what’s happening now
        </h1>
        <p className="text-lg mb-10">Join Twitter today</p>
        <img src={socialMedia} className="w-[520px]" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 mt-10">
        <div className="w-full max-w-md">

          <img src={twitterLogo} className="w-10 mb-6" />

          <h2 className="text-2xl font-bold mb-2">
            Discover what’s happening
          </h2>

          <p className="text-gray-500 pb-10">
            Sign in to your account
          </p>

          {/* TABS */}
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 pb-2 ${
                activeTab === "login"
                  ? "border-b-2 border-[#1DA1F2]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>

            <button
              className={`flex-1 pb-2 ${
                activeTab === "register"
                  ? "border-b-2 border-[#1DA1F2]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">

              <input
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full p-3 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full p-3 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <button className="w-full bg-[#1DA1F2] text-white py-3 rounded-full">
                Sign in
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">

              <input
                name="firstName"
                value={registerData.firstName}
                onChange={handleRegisterChange}
                placeholder="First name"
                className="w-full p-3 border rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}

              <input
                name="lastName"
                value={registerData.lastName}
                onChange={handleRegisterChange}
                placeholder="Last name"
                className="w-full p-3 border rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}

              <input
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className="w-full p-3 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                className="w-full p-3 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <button className="w-full bg-black text-white py-3 rounded-full">
                Sign up
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}