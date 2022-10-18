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
				id={domain?.id}
				title={domainMetadata?.title}
				description={domainMetadata?.description}
				owner={domain?.owner}
				creator={domain?.minter}
				isNFTView
			/>

			<Actions domain={domain} domainMetadata={domainMetadata} />

			<NFTMetrics
				domainId={domain?.id}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<TokenHashInfo domain={domain} />

			<HistoryList domainId={domain?.id} paymentToken={paymentTokenInfo} />
		</>
	);
};
