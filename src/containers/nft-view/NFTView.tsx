//- React Imports
import { FC } from 'react';

//- Container Imports
import NFTViewStats from '../../features/ui/Stats/NFTViewStats';

//- Library Imports
import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type NFTViewContainerProps = {
	metrics: DomainMetrics;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTViewContainer: FC<NFTViewContainerProps> = ({
	metrics,
	paymentTokenInfo,
}) => (
	<>
		<h1>NFT View</h1>
		<NFTViewStats metrics={metrics} paymentTokenInfo={paymentTokenInfo} />
	</>
);

export default NFTViewContainer;
