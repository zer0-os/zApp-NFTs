//- React Imports
import { FC } from 'react';

//- Components Imports
import HistoryList from '../../features/view-nft/HistoryList/HistoryList';
import TokenHashInfo from '../../features/view-nft/TokenHashInfo/TokenHashInfo';
import NFTMetrics from '../../features/view-nft/NFTMetrics/NFTMetrics';
import DomainPreview from '../../features/domain-preview/DomainPreview';
import Actions from '../../features/view-nft/Actions/Actions';

//- Hooks Imports
import { useDomainEvents } from '../../lib/hooks/useDomainEvents';
import { useBidData } from '../../lib/hooks/useBidData';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

type NFTContainerProps = {
	domain: Domain;
	metrics: DomainMetrics;
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTContainer: FC<NFTContainerProps> = ({
	domain,
	metrics,
	domainMetadata,
	paymentTokenInfo,
}) => {
	const { data: bids } = useBidData(domain?.id);
	const { data: domainEvents, isLoading: isEventDataLoading } = useDomainEvents(
		domain?.id,
	);

	return (
		<>
			<DomainPreview
				title={domainMetadata?.title}
				description={domainMetadata?.description}
				owner={domain?.owner}
				creator={domain?.minter}
				isNFTView
			/>

			<Actions
				bids={bids}
				domain={domain}
				domainMetadata={domainMetadata}
				paymentTokenInfo={paymentTokenInfo}
			/>

			{/* todo: combine loading data */}
			<NFTMetrics
				bids={bids}
				isLoading={isEventDataLoading}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<TokenHashInfo domain={domain} />

			<HistoryList events={domainEvents} paymentToken={paymentTokenInfo} />
		</>
	);
};

export default NFTContainer;
