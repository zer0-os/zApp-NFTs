import { FC } from 'react';
import { Switch } from 'react-router-dom';

import { AppProps } from './lib/types/app';
import { getDomainId } from './lib/util/domains/domains';
import { useDataContainer } from './lib/hooks/useDataContainer';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

export const App: FC<AppProps> = ({ route }) => {
	const domainId = getDomainId(route);

	const { isNFTView } = useDataContainer(domainId);

	const isRoot = route.split('.').length === 1 && !route.includes('.');

	return (
		<main
			className={cx(styles.Main, {
				isRoot: isRoot,
			})}
		>
			<Switch>
				{!isNFTView && <Domains isRoot={isRoot} domainId={domainId} />}

				{isNFTView && <NFT domainId={domainId} />}
			</Switch>
		</main>
	);
};
