import { FC, ReactNode } from 'react';
import { Network } from '../constants/networks';

interface ChainGateProps {
	chainId: number;
	children: ReactNode;
}

const ChainGate: FC<ChainGateProps> = ({ chainId, children }) => {
	const isSupportedNetwork = Object.values(Network).includes(chainId);

	if (!isSupportedNetwork) {
		return (
			<>
				Marketplace dApp is not supported on this chain! Please switch to
				mainnet or Rinkeby
			</>
		);
	}

	return <>{children}</>;
};

export default ChainGate;
