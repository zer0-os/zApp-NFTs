import { FC } from 'react';

import {
	Actions,
	HistoryList,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';
import { DomainPreview } from '../../features/domain-preview';

type NFTProps = {
	domainId: string;
};

export const NFT: FC<NFTProps> = ({ domainId }) => (
	<>
		<DomainPreview domainId={domainId} />

		<Actions domainId={domainId} />

		<NFTMetrics domainId={domainId} />

		<TokenHashInfo domainId={domainId} />

		<HistoryList domainId={domainId} />
	</>
);
