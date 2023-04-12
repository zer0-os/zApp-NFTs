import { Switch } from 'react-router-dom';

import { useCurrentRoute, useSubdomainData } from './lib/hooks';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import styles from './App.module.scss';
import { RaffleContainer } from './features/nft-drop-raffle';
import { BannerSeries } from './features/ui/BannerSeries/BannerSeries';

export const App = () => {
	const { isNftViewParams, currentDomainId } = useCurrentRoute();
	const { isLoading, data: subdomains } = useSubdomainData(currentDomainId);
	const enableBanner = true;

	return (
		<div className={styles.Container}>
			{enableBanner && <RaffleContainer />}

			<Switch>
				{isNftViewParams || (!isLoading && subdomains?.length === 0) ? (
					<NFT />
				) : (
					<Domains />
				)}
			</Switch>
		</div>
	);
};
