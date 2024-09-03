"use client";
import React from 'react';
import ChainDropdown from '../ChainDropdown';
// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Header = () => {
  return (
    <header className="bg-dark-2 py-3 px-6 flex items-center justify-between shadow-md sticky top-0 z-30">
      <div className="flex-grow"></div>
      <div className="relative flex gap-5">
        <ConnectButton />
        <ChainDropdown />
      </div>
    </header>
  );
};

export default Header;
