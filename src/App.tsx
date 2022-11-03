import { Switch } from 'react-router-dom';

import { useCurrentRoute } from './lib/hooks/useCurrentRoute';
import { useSubdomainData } from './lib/hooks/useSubdomainData';

import { ZAppContent } from '@zero-tech/zapp-utils/components/ZAppContent';
import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

export const App = () => {
	const { isRootDomain, isNftView, currentDomainId } = useCurrentRoute();
	const { data: subdomains } = useSubdomainData(currentDomainId);

	return (
		<ZAppContent>
			<main
				className={cx(styles.Main, {
					isRoot: isRootDomain,
				})}
			>
				<Switch>
					{isNftView || subdomains?.length === 0 ? <NFT /> : <Domains />}
				</Switch>
			</main>
		</ZAppContent>
	);
};
