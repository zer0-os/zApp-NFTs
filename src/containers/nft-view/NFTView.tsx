//- React Imports
import { FC } from 'react';

//- Components Imports
import HistoryList from '../../features/ui/HistoryList/HistoryList';
import TokenHashInfo from '../../features/ui/Stats/TokenHashInfo';
import NFTViewStats from '../../features/ui/Stats/NFTViewStats';
import NFTCard from '../../features/ui/NFTCard/NFTCard';
import Actions from '../../features/actions/Actions/Actions';

//- Hooks Imports
import { useDomainEvents } from '../../lib/hooks/useDomainEvents';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';
import { useBidData } from '../../lib/hooks/useBidData';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Utils Imports
import {
	getHighestBid,
	getUserBids,
	sortEventsByTimestamp,
} from './NFTView.util';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

type NFTViewContainerProps = {
	accountId: string;
	domain: Domain;
	metrics: DomainMetrics;
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
	openModal: (domainName?: string, type?: ModalType) => void;
};

const NFTViewContainer: FC<NFTViewContainerProps> = ({
	accountId,
	domain,
	metrics,
	domainMetadata,
	paymentTokenInfo,
	openModal,
}) => {
	const { data: bids } = useBidData(domain?.id);
	const { data: buyNowPrice } = useBuyNowPrice(domain?.id);
	const { data: domainEvents, isLoading: isEventDataLoading } = useDomainEvents(
		domain?.id,
	);
	const isOwnedByUser =
		domain?.owner?.toLowerCase() === accountId.toLowerCase();
	const isBiddable = !isOwnedByUser || Boolean(domainMetadata?.isBiddable);
	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);
	const highestBid = getHighestBid(bids);
	const userBid = getUserBids(accountId, bids);

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
				accountId={accountId}
				domainName={domain?.name}
				bidData={bids}
				isOwnedByUser={isOwnedByUser}
				isBiddable={isBiddable}
				buyNowPrice={buyNowPrice}
				highestBid={highestBid}
				userBid={userBid}
				paymentTokenInfo={paymentTokenInfo}
				onButtonClick={openModal}
			/>

			{/* todo: combine loading data */}
			<NFTViewStats
				bids={bids}
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
