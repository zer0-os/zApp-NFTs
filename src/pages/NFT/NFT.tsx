import { FC } from 'react';

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

			{domain && domainMetadata && (
				<TransferOwnershipModal
					domainId={domain.id}
					domainTitle={domainMetadata.title}
					domainCreator={domain.minter}
					open
				/>
			)}

			<TokenHashInfo domain={domain} />

			<HistoryList domainId={domain?.id} paymentToken={paymentTokenInfo} />
		</>
	);
};
