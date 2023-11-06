"use client";

import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, polygonMumbai, avalanche } from "wagmi/chains";

const projectId = process.env.WALLETCONNECT_ID || "826b70627f53bfa85e6e600a223ff6c0";
console.log(projectId);
const chains = [mainnet, arbitrum, polygon, polygonMumbai, avalanche];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: "defndr" });

createWeb3Modal({ wagmiConfig, projectId, chains });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
