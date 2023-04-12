import { Switch } from 'react-router-dom';

import { useCurrentRoute, useSubdomainDataById } from './lib/hooks';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import styles from './App.module.scss';

export const App = () => {
	const { isNftViewParams, currentDomainId } = useCurrentRoute();
	const { isLoading, data: subdomains } = useSubdomainDataById(currentDomainId);

	return (
		<div className={styles.Container}>
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
