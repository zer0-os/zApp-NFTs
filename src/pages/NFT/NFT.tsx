import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import {
	Actions,
	Banner,
	DetailsCard,
	HistoryList,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';

export const NFT = () => {
	const { currentZna } = useCurrentRoute();

	return (
		<>
			<Banner zna={currentZna} />
			<DetailsCard zna={currentZna} />
			{/* TODO: remove Actions in follow up task */}
			<Actions zna={currentZna} />
			<NFTMetrics zna={currentZna} />
			<TokenHashInfo zna={currentZna} />
			<HistoryList zna={currentZna} />
		</>
	);
};
