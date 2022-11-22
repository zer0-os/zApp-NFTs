import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { ZAppContent } from '@zero-tech/zapp-utils/components/ZAppContent';

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
			<NFTBannerContainer zna={currentZna} />

			<main className={styles.Main}>
				<div className={styles.ContentWrapper}>
					<ZAppContent>
						<NFTDetailsCard zna={currentZna} />
						{/* TODO: remove Actions in follow up task */}
						<Actions zna={currentZna} />
						<NFTMetrics zna={currentZna} />
						<TokenHashInfo zna={currentZna} />
						<HistoryList zna={currentZna} />
					</ZAppContent>
				</div>
			</main>
		</>
	);
};
