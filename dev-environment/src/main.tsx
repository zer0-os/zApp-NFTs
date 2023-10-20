import './vite-setup';

import React from 'react';
import { render } from 'react-dom';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeEngine } from '@zero-tech/zui/components';
import { Themes } from '@zero-tech/zui/components/ThemeEngine';
import { DevApp } from './components/DevApp';

import { WagmiConfig } from 'wagmi';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { goerli, mainnet } from 'wagmi/chains';

import './main.css';

// 2. Create wagmiConfig
const metadata = {
	name: 'NFTs zApp',
	description: 'A zApp for trading NFTs',
	url: 'https://zero.tech/',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const chains = [mainnet, goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const history = createBrowserHistory();

render(
	<React.StrictMode>
		<Router history={history}>
			<WagmiConfig config={wagmiConfig}>
				<ThemeEngine theme={Themes.Dark} />
				<DevApp />
			</WagmiConfig>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
