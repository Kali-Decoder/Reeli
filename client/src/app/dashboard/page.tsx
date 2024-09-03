"use client";
import React from "react";
import { useDataContext } from "@/context/DataContext";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccount, usePublicClient, useNetwork } from "wagmi";
const DashboardPage = () => {
  const { mintTokens, transferTokens, depositTokens } = useDataContext();
  const { account } = useWallet();
  const {address} = useAccount();
  const handleClick = async (amount) => {
    if (!account) return;
    console.log("Account:", account);
    // await getTokenMetadata(account?.address);
    // await mintTokens(
    //   "0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4",
    //   1000000000
    // );
    await transferTokens(
      "0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4",
      "0x27ef28cce0eed615f0029370831aeb75cbbbfefdbf12087bea94f11745759bb6",
      amount * 10 ** 6
    );
    // await depositTokens();
  };
  return (
    <div className="bg-dark-3 flex justify-center items-center">
      <div className="text-white mx-auto grid max-w-3xl grid-cols-2 gap-y-4 px-10 py-10 sm:rounded-md sm:shadow">
        <div className="col-span-2 col-start-1 flex flex-col justify-between py-3 sm:flex-row">
          <p className="font-bold text-3xl">Your Stats</p>
        </div>
        <div className="col-span-2 -mx-4 bg-gradient-to-t from-indigo-500 to-blue-500 px-4 py-8 sm:col-span-1 sm:mx-0 sm:rounded-xl sm:py-4">
          <p className="mb-4 font-bold text-indigo-100">
            User Investment Stats
          </p>
          <div className="mb-6 flex max-w-xs">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 sm:mr-3 sm:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div className="px-4">
              <p className="mb-1 text-2xl font-black text-white">14 Reels</p>
              <p className="font-medium text-indigo-100">$1,934.00</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col items-center px-4 py-1">
              <p className="text-lg font-medium text-white">232</p>
              <p className="text-xs font-medium text-indigo-100">Comments</p>
            </div>
            <div className="mb-1 flex flex-col items-center px-4 py-1 sm:mr-1 sm:mb-0">
              <p className="text-lg font-medium text-white">$140</p>
              <p className="text-xs font-medium text-indigo-100">Max-Invest</p>
            </div>
            <div className="mb-1 flex flex-col items-center rounded-2xl bg-white px-4 py-1 sm:mr-1 sm:mb-0">
              <p className="text-lg font-medium text-indigo-500">2309</p>
              <p className="text-xs font-medium text-indigo-500">Likes</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 py-4 sm:col-span-1 sm:gap-8 sm:px-4">
          <div className="">
            <p className="text-lg font-bold">392</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">
              Transactions
            </span>
          </div>
          <div className="">
            <p className="text-lg font-bold">621</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">
              Max Ingagement Points
            </span>
          </div>
          <div className="">
            <p className="text-lg font-bold">68</p>
            <p className="text-slate-400 mb-2 font-medium">$230,000</p>
            <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">
              Total Credites
            </span>
          </div>
          <div className="">
            <p className="text-lg font-bold">970</p>
            <p className="text-slate-400 mb-2 font-medium">$1,000</p>
            <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">
              Referral Earnings
            </span>
          </div>
        </div>
        <div className="col-span-2 col-start-1 grid grid-cols-2 gap-6 py-4 sm:grid-cols-4 sm:px-4 sm:py-8">
          <div className="">
            <p className="text-slate-500 text-sm">Revenue</p>
            <p className="text-xl font-medium">$924,883</p>
          </div>
          <div className="">
            <p className="text-slate-500 text-sm">Liabilities</p>
            <p className="text-xl font-medium">$924,883</p>
          </div>
          <div className="">
            <p className="text-slate-500 text-sm">Profit</p>
            <p className="text-xl font-medium">$213,002</p>
          </div>
          <div className="">
            <p className="text-slate-500 text-sm">Target</p>
            <p className="text-xl font-medium">$150,000</p>
          </div>
        </div>
        <div className="col-span-2  col-start-1 grid ">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-md font-medium text-white sm:px-6">
                  Reel-Id
                </td>

                <td className="whitespace-normal py-4 text-md font-medium text-white sm:px-6">
                  Date
                </td>

                <td className="whitespace-normal py-4 text-md font-medium text-white sm:px-6">
                  Amount
                </td>

                <td className="whitespace-normal py-4 text-md font-medium text-white sm:px-6">
                  Status
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              <tr className="">
                <a
                className="block font-bold"
                  href="https://explorer.aptoslabs.com/account/0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4?network=devnet"
                  target="_blank"
                >
                  #4343
                </a>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-white sm:px-6 lg:table-cell">
                  09 Aug, 2024
                </td>

                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-green-400 lg:text-left">
                  $100.00
                  
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-white sm:px-6 lg:table-cell">
                  <div
                    onClick={() => {
                      handleClick(5);
                    }}
                    className="inline-flex cursor-pointer items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white"
                  >
                    Claim Reward
                  </div>
                </td>
              </tr>

              <tr className="">
                <td className="whitespace-no-wrap py-4 text-sm font-bold text-white sm:px-6">
                  <a
                    className="block"
                    href="https://explorer.aptoslabs.com/account/0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4?network=devnet"
                    target="_blank"
                  >
                    #2343
                  </a>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-white sm:px-6 lg:table-cell">
                  09 Aug, 2024
                </td>

                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-green-400 lg:text-left">
                  $120.00
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-white sm:px-6 lg:table-cell">
                  <div
                    onClick={() => {
                      handleClick(5);
                    }}
                    className="inline-flex cursor-pointer  items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white"
                  >
                    Claim Reward
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
