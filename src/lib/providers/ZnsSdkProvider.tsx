//- React Imports
import { createContext, FC, ReactNode, useMemo } from "react";

//- Library Imports
import { providers } from "ethers";

import * as zns from "@zero-tech/zns-sdk";

import {
  DEFAULT_NETWORK,
  Network,
  NETWORK_CONFIGS,
} from "../constants/networks";

interface ZnsSdkProviderProps {
  provider?: providers.Web3Provider;
  children: ReactNode;
}

const defaultConfig = zns.configuration.rinkebyConfiguration;

// @TODO: not sure if this is the best way to create default context
export const ZnsSdkContext = createContext(
  zns.createInstance(
    defaultConfig(
      new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl)
    )
  )
);

const ZnsSdkProvider: FC<ZnsSdkProviderProps> = ({
  provider: providerProps,
  children,
}: ZnsSdkProviderProps) => {
  const sdk = useMemo(() => {
    const provider =
      providerProps ??
      new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl);

    // We know that the chain ID will be a valid network because
    // ChainGate will prevent this provider from rendering if
    // the chain matches an unsupported network
    const network: Network = provider?._network?.chainId ?? 4;

    // Only supporting two networks so can use ternary
    const znsConfig =
      network === Network.MAINNET
        ? zns.configuration.mainnetConfiguration
        : zns.configuration.rinkebyConfiguration;

    return zns.createInstance(znsConfig(provider));
  }, [providerProps]);

  return (
    <ZnsSdkContext.Provider value={sdk}>{children}</ZnsSdkContext.Provider>
  );
};

export default ZnsSdkProvider;
