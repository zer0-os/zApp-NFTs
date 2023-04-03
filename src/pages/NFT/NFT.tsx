import { useCurrentRoute } from '../../lib/hooks/useCurrentRoute';

import { ZAppContent } from '@zero-tech/zapp-utils/components/ZAppContent';

import {
	Actions,
	Attributes,
	HistoryList,
	NFTBannerContainer,
	NFTDetailsCard,
	NFTMetrics,
	TokenHashInfo,
} from '../../features/view-nft';

import * as selectors from './selectors';
import styles from './NFT.module.scss';

export const NFT = () => {
	const { currentZna } = useCurrentRoute();

	return (
		<>
			<NFTBannerContainer zna={currentZna} />

			<main className={styles.Main} data-testid={selectors.nftMain}>
				<ZAppContent className={styles.Content}>
					<NFTDetailsCard zna={currentZna} />
					<Actions zna={currentZna} />
					<NFTMetrics zna={currentZna} />
					<Attributes zna={currentZna} />
					<TokenHashInfo zna={currentZna} />
					<HistoryList zna={currentZna} />
				</ZAppContent>
			</main>
		</>
	);
};
