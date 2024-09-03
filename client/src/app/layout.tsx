"use client";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

// import { PetraWallet } from "petra-plugin-wallet-adapter";
// import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import DataContextProvider from "@/context/DataContext";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

import { WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "@/utils/wallet-utils";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const wallets = [new PetraWallet()];
  return (
    <html lang="en">
      <body className="bg-dark-3">
      <Toaster position="top-right" reverseOrder={false} />
      {/* <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}> */}
      <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
        <Header />
          <Sidebar>
            <DataContextProvider>{children}</DataContextProvider>
          </Sidebar>
          </RainbowKitProvider>
          </WagmiConfig>
        {/* </AptosWalletAdapterProvider> */}
      </body>
    </html>
  );
}
