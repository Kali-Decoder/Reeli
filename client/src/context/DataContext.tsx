"use client";
import React, { useState, useEffect } from "react";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { useAccount, usePublicClient, useNetwork } from "wagmi";
import { useEthersSigner } from "@/utils/signer";
import { ethers, BigNumber } from "ethers";
import toast from "react-hot-toast";
import { Provider, Network } from "aptos";
import {
  tokenAddress,
  tokenAbi,
  mainContractABI,
  mainContractAddress,
} from "@/constant/index";

// import { Aptos, AptosConfig,  } from "@aptos-labs/ts-sdk";
const DataContext = React.createContext();
const DataContextProvider = ({ children }) => {
  //   const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  const provider = new Provider(Network.DEVNET);
  //   const aptos = new Aptos(aptosConfig);
  const { account, signAndSubmitTransaction } = useWallet();
  const { address } = useAccount();
  const { chains, chain } = useNetwork();
  const [activeChain, setActiveChainId] = useState(chain?.id);

  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);
  const signer = useEthersSigner(activeChain);

  const MODULE_ADDRESS =
    "0x25e6d86a5a7083d9d61e40381e5238ab6d2e785825eba0183cebb6009483dab4";
  //   const getTokenMetadata = async (hostAddress: string) => {
  //     if (!hostAddress) return;
  //     const functionType = "get_metadata";
  //     try {
  //       const todoListResource = await aptos.view({
  //         payload: {
  //           function: `${MODULE_ADDRESS}::reels_fi::${functionType}`,
  //           typeArguments: [],
  //           functionArguments: [],
  //         },
  //       });
  //       console.log(todoListResource, "todoListResource");
  //     } catch (e: any) {
  //       console.error(e, "error");
  //     }
  //   };

  const getContractInstance = async (contractAddress, contractAbi) => {
    try {
      let contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
    }
  };

  const depositFunds = async (amount, postId) => {
    try {
      let approveId = toast.loading("Approving transaction...");
      const degoTokenContract = await getContractInstance(
        tokenAddress,
        tokenAbi
      );
      //make amount as per decimals
      amount = BigNumber.from(amount).mul(
        BigNumber.from(10).pow(await degoTokenContract.decimals())
      );
      const approvetx = await degoTokenContract.approve(
        mainContractAddress,
        amount,
        { from: address }
      );

      await approvetx.wait();

      toast.success("Limit Approved", { id: approveId });

      const contractInstance = await getContractInstance(
        mainContractAddress,
        mainContractABI
      );

      let txId = toast.loading("Depositing funds to this Content...");
      const monetizeId = toast.loading("Monetize your post...");
      const monetizeTx = await contractInstance.createPost(true, {
        from: address,
        value : ethers.utils.parseUnits('100', 'wei')
      });
      await monetizeTx.wait();
      toast.success("Monetize successfull", { id: monetizeId });
      const tx = await contractInstance.depositFunds(amount, postId, {
        from: address,
      });
      await tx.wait();

      toast.success("Funds Deposited", { id: txId });

      return tx;
    } catch (error) {
      console.log(error);
      toast.error("Error in depositing funds");
    }
  };

  const mintTokens = async (toAddress: string, mintAmount: number) => {
    const mintPayload = {
      data: {
        function: `${MODULE_ADDRESS}::reels_fi::mint`,
        typeArguments: [],
        functionArguments: [toAddress, mintAmount],
      },
    };
    try {
      let id = toast.loading("Investing Tokens...");
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(mintPayload);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
      toast.success("Invested Successfully !!!", { id });
    } catch (error: any) {
      console.log(error);
      toast.error("Investment Failed !!!");
    }
  };
  const transferTokens = async (fromAddress, toAddress, transferAmount) => {
    let id = toast.loading("Claiming Tokens...");
    const transferPayload = {
      data: {
        function: `${MODULE_ADDRESS}::reels_fi::transfer`, // Update this with the correct module and function name
        typeArguments: [], // Add any type arguments if needed
        functionArguments: [fromAddress, toAddress, transferAmount],
      },
    };

    try {
      // Sign and submit the transaction to the chain
      const response = await signAndSubmitTransaction(transferPayload);

      // Wait for the transaction to be confirmed
      await provider.waitForTransaction(response.hash);
      toast.success("Claimed Successfully !!!", { id });
      console.log("Transfer successful");
    } catch (error) {
      console.log("Transfer failed", error);
      toast.error("Claiming Failed !!!");
    }
  };
  const depositTokens = async (toAddress, fungibleAsset) => {
    const depositPayload = {
      data: {
        function: `${MODULE_ADDRESS}::reels_fi::deposit`,
        typeArguments: [],
        functionArguments: [toAddress, fungibleAsset],
      },
    };

    try {
      // Sign and submit the transaction to the chain
      const response = await signAndSubmitTransaction(depositPayload);
      // Wait for the transaction to be confirmed
      await provider.waitForTransaction(response.hash);
      console.log("Deposit successful");
    } catch (error) {
      console.log("Deposit failed", error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        // getTokenMetadata,
        mintTokens,
        transferTokens,
        depositTokens,
        depositFunds,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => React.useContext(DataContext);
export default DataContextProvider;
