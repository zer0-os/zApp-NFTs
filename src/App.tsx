import React from 'react';
import { Switch } from 'react-router-dom';

import { useCurrentRoute, useSubdomainDataById } from './lib/hooks';

import { DynamicSizeWrapper } from './lib/util/DynamicSizeWrapper';
import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import styles from './App.module.scss';
import { RaffleContainer } from './features/nft-drop-raffle';
import { BannerSeries } from './features/ui/BannerSeries/BannerSeries';

export const App = () => {
	const { isNftViewParams, currentDomainId } = useCurrentRoute();
	const { isLoading, data: subdomains } = useSubdomainDataById(currentDomainId);
	const enableBanner = true;

	return (
		<DynamicSizeWrapper className={styles.Container}>
			{enableBanner && <RaffleContainer />}
			<Switch>
				{isNftViewParams || (!isLoading && subdomains?.length === 0) ? (
					<NFT />
				) : (
					<Domains />
				)}
			</Switch>
		</DynamicSizeWrapper>
	);
};
