"use client";
import { login } from "@/redux/slices/AuthSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import Link from "next/link";
import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdSchool,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { isSignInUp } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email.trim() !== "" || form.password.trim() !== "") {
      dispatch(login(form));
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <MdSchool className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your School Management account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="h-5 w-5" />
                    ) : (
                      <MdVisibility className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSignInUp}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
              >
                {isSignInUp ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  (window.location.href = "http://localhost:5000/auth/google")
                }
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-lg cursor-pointer flex items-center justify-center border border-gray-300"
              >
                <IoLogoGoogle className="text-red-500 mr-2 text-xl" />
                Sign in with Google
              </button>
            </form>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
