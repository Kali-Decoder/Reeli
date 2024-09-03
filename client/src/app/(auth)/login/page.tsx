"use client";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
const SigninPage: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const handleSubmit = async (e: React.FormEvent) => {
    let id = toast.loading("Logging in...");
    e.preventDefault();
    console.log(loginData);
    await delay(4000);
    toast.success("Logged in Successfully !!!", { id });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-dark-3">
        <div className="w-full max-w-lg   p-8 shadow-md flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-light-1">
            Sign In
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-light-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-light-3"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="********"
              />
            </div>
            <div className="space-y-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm  text-dark-1 font-semibold bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
              >
                Sign In
              </button>
              <p className="text-center text-light-2 text-sm">
                Not yet registered?{" "}
                <Link href="/register" className="text-primary-500 hover:underline font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
