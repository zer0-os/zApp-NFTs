import { FC, useState } from 'react';

import {
	Actions,
	HistoryList,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';
import { DomainPreview } from '../../features/domain-preview';

import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { Metadata } from '../../lib/types/metadata';
import { TransferOwnershipModal } from '../../features/transfer-ownership';

type NFTProps = {
	domain: Domain;
	metrics: DomainMetrics;
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
};

export const NFT: FC<NFTProps> = ({
	domain,
	metrics,
	domainMetadata,
	paymentTokenInfo,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const onClose = () => setIsOpen(false);
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
				domain={domain}
				domainMetadata={domainMetadata}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<NFTMetrics
				domainId={domain?.id}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			{/* todo: remove - temp import to display modal for development prior to dropdown implementation */}
			{domain && domainMetadata && (
				<TransferOwnershipModal
					domainId={domain.id}
					domainName={domain.name}
					domainTitle={domainMetadata.title}
					domainOwner={domain.owner}
					domainCreator={domain.minter}
					open={isOpen}
					onClose={onClose}
				/>
			)}

			<TokenHashInfo domain={domain} />

			<HistoryList domainId={domain?.id} paymentToken={paymentTokenInfo} />
		</>
	);
};
