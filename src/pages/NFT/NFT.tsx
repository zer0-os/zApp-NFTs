import {
	Actions,
	HistoryList,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';
import { DomainPreview } from '../../features/domain-preview';

import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

export const NFT = () => {
	const { currentZna } = useCurrentRoute();

	return (
		<>
			<DomainPreview zna={currentZna} variant={'full'} />
			<Actions zna={currentZna} />
			<NFTMetrics zna={currentZna} />
			<TokenHashInfo zna={currentZna} />
			<HistoryList zna={currentZna} />
		</>
	);
};
