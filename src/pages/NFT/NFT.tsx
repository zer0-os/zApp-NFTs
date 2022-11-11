import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import {
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
			{/* <Actions zna={currentZna} /> */}
			<NFTMetrics zna={currentZna} />
			<TokenHashInfo zna={currentZna} />
			<HistoryList zna={currentZna} />
		</>
	);
};
