"use client";
import React, { useState, useRef, useEffect } from "react";

const ChainDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const chains = [
    { name: "Aptos", url: "https://explorer.aptoslabs.com/txn/86687535/changes?network=devnet" },
    { name: "Polygon Amoy", url: "https://www.oklink.com/amoy/address/0x93073de0d67ecfbbc44321ef7e4d33bcf7f53b9a" },
    { name: "EduChain", url: "https://opencampus-codex.blockscout.com/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA" },
    { name: "Wan-Chain", url: "https://testnet.wanscan.org/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA" },
    { name: "Core-DAO", url: "https://scan.test.btcs.network/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA" },
    // { name: "Reels-Fi Contract", url: "https://github.com/Snehagupta1907/APT-ReelFI/blob/main/web3-backend/contracts/V1/ReelsFi.sol" },
    {name:"Manta Chain",url:"https://pacific-explorer.sepolia-testnet.manta.network/address/0xBCab4ba549886e6BEF67d9f3d381a2710316F8CA"}
  ];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (chain: string) => {
    setSelectedChain(chain);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex w-full justify-between rounded-lg border border-dark-4 bg-dark-3 px-4 py-2 text-light-1 shadow-sm ring-1 ring-dark-4 hover:bg-dark-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedChain || "Select Chain"}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-dark-2 shadow-lg ring-1 ring-dark-4"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="p-1">
            {chains.map((chain) => (
              <a href={`${chain.url}`} target="_blank">
                {" "}
                <button
                  key={chain.name}
                  onClick={() => handleSelect(chain.name)}
                  className={`group flex w-full items-center rounded-lg px-4 py-2 text-sm text-light-1 hover:bg-dark-4 focus:outline-none ${
                    selectedChain === chain.name ? "bg-dark-4" : ""
                  }`}
                  role="menuitem"
                >
                  {chain.name}
                </button>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainDropdown;
