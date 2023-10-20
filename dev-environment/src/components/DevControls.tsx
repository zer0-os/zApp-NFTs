import React from 'react';

import { useAccount } from 'wagmi';
import { truncateAddress } from '@zero-tech/zui/utils';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { Button } from '@zero-tech/zui/components/Button';

export const DevControls = () => {
	const { address } = useAccount();
	const { open } = useWeb3Modal();

	const content = address ? (
		<span>
			Connected as <b>{truncateAddress(address)}</b>
		</span>
	) : (
		<Button onPress={() => open()}>Connect</Button>
	);

	return (
		<footer
			style={{
				position: 'fixed',
				bottom: 0,
				width: '100%',
				boxSizing: 'border-box',
				padding: '1rem',
				borderRadius: '0.5rem',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				color: 'black',
				zIndex: 1000,
			}}
			data-testid="zapp-dev-controls"
		>
			<div></div>
			<span style={{}}>{content}</span>
		</footer>
	);
};
