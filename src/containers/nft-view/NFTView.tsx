//- React Imports
import { FC } from 'react';

//- Components Imports
import HistoryList from '../../features/ui/HistoryList/HistoryList';
import TokenHashInfo from '../../features/ui/Stats/TokenHashInfo';
import NFTViewStats from '../../features/ui/Stats/NFTViewStats';
import NFTCard from '../../features/ui/NFTCard/NFTCard';

//- Hooks Imports
import { useDomainEvents } from '../../lib/hooks/useDomainEvents';
import { useBidData } from '../../lib/hooks/useBidData';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Utils Imports
import { sortEventsByTimestamp } from './NFTView.util';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type NFTViewContainerProps = {
	domain: Domain;
	metrics: DomainMetrics;
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTViewContainer: FC<NFTViewContainerProps> = ({
	domain,
	metrics,
	domainMetadata,
	paymentTokenInfo,
}) => {
	const { data: domainEvents, isLoading: isEventDataLoading } = useDomainEvents(
		domain?.id,
	);
	const { bids } = useBidData(domainEvents);

	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);

	return (
		<>
			<NFTCard
				title={domainMetadata?.title}
				description={domainMetadata?.description}
				owner={domain?.owner}
				creator={domain?.minter}
				isNFTView
			/>

			<NFTViewStats
				bids={bids}
				// Todo: combine loading data
				isLoading={isEventDataLoading}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<TokenHashInfo domain={domain} />

			<HistoryList events={sortedDomainEvents} />
		</>
	);
};

export default NFTViewContainer;
