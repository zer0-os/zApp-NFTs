//- React Imports
import { FC } from 'react';

//- Components Imports
import HistoryList from '../../features/nft-view/history/HistoryList/HistoryList';
import TokenHashInfo from '../../features/ui/Stats/TokenHashInfo';
import NFTViewStats from '../../features/ui/Stats/NFTViewStats';
import NFTCard from '../../features/ui/NFTCard/NFTCard';
import Actions from '../../features/nft-view/actions/Actions/Actions';

//- Hooks Imports
import useWeb3 from '../../lib/hooks/useWeb3';
import { useDomainEvents } from '../../lib/hooks/useDomainEvents';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';
import { useBidData } from '../../lib/hooks/useBidData';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Utils Imports
import { getHighestBid, getUserBids, sortEventsByTimestamp } from './NFT.utils';

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
	const { account } = useWeb3();
	const { data: bids } = useBidData(domain?.id);
	const { data: buyNowPrice } = useBuyNowPrice(domain?.id);
	const { data: domainEvents, isLoading: isEventDataLoading } = useDomainEvents(
		domain?.id,
	);
	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();
	const isBiddable = !isOwnedByUser || Boolean(domainMetadata?.isBiddable);
	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);
	const highestBid = getHighestBid(bids);
	const userBids = getUserBids(account, bids);
	const highgestUserBid = getHighestBid(userBids);

	return (
		<>
			<NFTCard
				title={domainMetadata?.title}
				description={domainMetadata?.description}
				owner={domain?.owner}
				creator={domain?.minter}
				isNFTView
			/>

			<Actions
				domainName={domain?.name}
				bidData={bids}
				isOwnedByUser={isOwnedByUser}
				isBiddable={isBiddable}
				buyNowPrice={buyNowPrice}
				highestBid={highestBid}
				highestUserBid={highgestUserBid}
				paymentTokenInfo={paymentTokenInfo}
			/>

			{/* todo: combine loading data */}
			<NFTViewStats
				bids={bids}
				isLoading={isEventDataLoading}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<TokenHashInfo domain={domain} />

			<HistoryList
				events={sortedDomainEvents}
				paymentToken={paymentTokenInfo}
			/>
		</>
	);
};

export default NFTContainer;
