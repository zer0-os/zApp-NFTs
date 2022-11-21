import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import {
	Actions,
	HistoryList,
	NFTBannerContainer,
	NFTDetailsCard,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';

import styles from './NFT.module.scss';

export const NFT = () => {
	const { currentZna } = useCurrentRoute();

	return (
		<>
			<div className={styles.Container}>
				<NFTBannerContainer zna={currentZna} />
				<NFTDetailsCard zna={currentZna} />
			</div>
			{/* TODO: remove Actions in follow up task */}
			<Actions zna={currentZna} />
			<NFTMetrics zna={currentZna} />
			<TokenHashInfo zna={currentZna} />
			<HistoryList zna={currentZna} />
		</>
	);
};
