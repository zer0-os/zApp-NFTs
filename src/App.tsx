import React from 'react';
import { Switch } from 'react-router-dom';

import { useCurrentRoute, useSubdomainData } from './lib/hooks';

import { DynamicSizeWrapper } from './lib/util/DynamicSizeWrapper';
import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import styles from './App.module.scss';

export const App = () => {
	const { isNftViewParams, currentDomainId } = useCurrentRoute();
	const { isLoading, data: subdomains } = useSubdomainData(currentDomainId);

	return (
		<DynamicSizeWrapper className={styles.Container}>
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
