import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NFTsZApp } from '../../../src/';

import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEthersProvider } from '../lib/useEthersProvider';
import { CHAIN_ID, RPC_URL } from '../lib/connectors';

export const DevApp = () => {
	const { address } = useAccount();
	const { open } = useWeb3Modal();

	const provider = useEthersProvider({ chainId: CHAIN_ID });

	return (
		<Fragment>
			<Switch>
				<Route
					path={'/:znsRoute/:app'}
					component={() => (
						<NFTsZApp
							provider={
								provider ?? new ethers.providers.JsonRpcProvider(RPC_URL)
							}
							route={'wilder'}
							web3={{
								chainId: provider?.network?.chainId ?? CHAIN_ID,
								address: address,
								connectWallet: open,
							}}
						/>
					)}
				/>
				<Redirect to={'/0.wilder/nfts'} />
			</Switch>
		</Fragment>
	);
};
