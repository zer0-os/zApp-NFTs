import { Switch } from 'react-router-dom';

import { useCurrentRoute } from './lib/hooks/useCurrentRoute';
import { useSubdomainData } from './lib/hooks/useSubdomainData';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import styles from './App.module.scss';

export const App = () => {
	const { isNftView, currentDomainId } = useCurrentRoute();
	const { data: subdomains } = useSubdomainData(currentDomainId);

	return (
		<div className={styles.Container}>
			<Switch>
				{isNftView || subdomains?.length === 0 ? <NFT /> : <Domains />}
			</Switch>
		</div>
	);
};
