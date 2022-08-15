//- React Imports
import { FC } from 'react';

//- Features Imports
import NFTViewStats from '../../features/ui/Stats/NFTViewStats';

//- Hooks Imports
import { useBidData } from '../../lib/hooks/useBidData';
import { useDomainEvents } from '../../lib/hooks/useDomainEvents';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type NFTViewContainerProps = {
	domain: Domain;
	metrics: DomainMetrics;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTViewContainer: FC<NFTViewContainerProps> = ({
	domain,
	metrics,
	paymentTokenInfo,
}) => {
	const { data: domainEvents, isLoading: isEventDataLoading } = useDomainEvents(
		domain?.id,
	);
	const { bids } = useBidData(domainEvents);

	return (
		<>
			<h1>NFT View</h1>
			<NFTViewStats
				bids={bids}
				// Todo: combine loading data
				isLoading={isEventDataLoading}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>
		</>
	);
};

export default NFTViewContainer;
