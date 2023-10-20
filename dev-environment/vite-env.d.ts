/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DEFAULT_NETWORK: string;
	readonly VITE_FAVICON: string;
	readonly VITE_PAGE_TITLE: string;
	readonly VITE_RPC_URL_1: string;
	readonly VITE_RPC_URL_4: string;
	readonly VITE_RPC_URL_42: string;
	readonly VITE_RPC_URL_5: string;
	readonly VITE_TITLE: string;
	readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
