import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import {
	Actions,
	HistoryList,
	NFTBannerContainer,
	NFTDetailsCard,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';

export const NFT = () => {
	const { currentZna } = useCurrentRoute();

	return (
		<>
			<NFTBannerContainer zna={currentZna} />
			<NFTDetailsCard zna={currentZna} />
			{/* TODO: remove Actions in follow up task */}
			<Actions zna={currentZna} />
			<NFTMetrics zna={currentZna} />
			<TokenHashInfo zna={currentZna} />
			<HistoryList zna={currentZna} />
		</>
	);
};
