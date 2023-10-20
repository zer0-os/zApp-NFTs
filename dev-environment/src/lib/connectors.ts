// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const RPC_URL = import.meta.env.VITE_RPC_URL_1 ?? process.env.RPC_URL;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID ?? 1);

import { InjectedConnector } from 'wagmi/connectors/injected';

export const injectedConnector = new InjectedConnector();
