"use client";
import React, { useState, ReactNode } from "react";
import { MdOutlineDashboard, MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { SiYoutubeshorts } from "react-icons/si";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccount, usePublicClient, useNetwork } from "wagmi";
interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };
  const { account } = useWallet();
  const {address} = useAccount();
  return (
    <>
      <div className="relative flex h-screen antialiased text-gray-900 bg-dark-4">
        {isSidebarOpen && (
          <div
            className={`fixed inset-y-0 z-30 flex w-80 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <svg
              className="absolute inset-0 w-full h-full text-white"
              style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
              preserveAspectRatio="none"
              viewBox="0 0 309 800"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
            </svg>
            <div className="z-10 flex flex-col flex-1">
              <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
                <p className="text-2xl font-bold">Reels-Fi</p>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-lg focus:outline-none focus:ring"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>
              <nav className="flex flex-col gap-y-8 flex-1 w-64 p-4 mt-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={handleLinkClick}
                >
                  <MdHome size={35} />
                  <span className="font-bold text-xl">Home</span>
                </Link>
                {address? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <MdOutlineDashboard size={35} />
                      <span className="font-bold text-xl">Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <CgProfile size={35} />
                      <span className="font-bold text-xl">Profile</span>
                    </Link>
                    <Link
                      href="/reeli"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <SiYoutubeshorts size={35} />
                      <span className="font-bold text-xl">Reeli</span>
                    </Link>
                    <Link
                      href="/create-reel"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <VscGitPullRequestCreate size={35} />
                      <span className="font-bold text-xl">Create Reel</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <MdOutlineDashboard size={35} />
                      <span className="font-bold text-xl">Sign-up</span>
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center space-x-2"
                      onClick={handleLinkClick}
                    >
                      <MdOutlineDashboard size={35} />
                      <span className="font-bold text-xl">Login</span>
                    </Link>
                  </>
                )}
              </nav>
              <div className="flex-shrink-0 p-4">
                <button className="flex items-center space-x-2">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-bold text-xl">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <main className="w-full h-screen">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`fixed p-2 text-white bg-black rounded-lg top-5 left-5 transition-transform ${
              isSidebarOpen ? "z-10" : "z-40"
            }`}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="sr-only">Open menu</span>
          </button>
          <h1 className="sr-only">Home</h1>
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
