"use client";
import Link from "next/link";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const {account} = useWallet();
  const router = useRouter()
  const [registerData, setRegisterData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: account?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const handleSubmit = async (e: React.FormEvent) => {
    let id = toast.loading("Registering...");
    e.preventDefault();
    console.log(registerData);
    await delay(4000);
    toast.success("Registered Successfully !!!", { id });
    router.push("/login");
  }
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-dark-3">
        <div className="w-full max-w-lg   p-8 shadow-md flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-light-1">
            Sign Up
          </h2>
          <form className="space-y-4">
          <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-light-3"
              >
              Full Name
              </label>
              <input
                type="name"
                id="name"
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="First Last"
                onChange={handleChange}
              />
            </div>
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
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="you@example.com"
                onChange={handleChange}
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
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="********"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-light-3"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-4 bg-dark-4 border border-dark-2 shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm text-light-1"
                placeholder="********"
              />
            </div>
            <WalletSelector/>
            <div className="space-y-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm  text-dark-1 font-semibold bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
              >
                Sign Up
              </button>
              <p className="text-center text-light-2 text-sm">
                Not yet registered?{" "}
                <Link href="/login" className="text-primary-500 hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
