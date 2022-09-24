import { FC } from 'react';

import { AppProps } from './lib/types/app';

import { useDataContainer } from './lib/hooks/useDataContainer';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import { getDomainId } from './lib/util/domains/domains';

import classNames from 'classnames/bind';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

export const App: FC<AppProps> = ({ provider, route }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	const domainId = getDomainId(route);
	const isRoot = route.split('.').length === 1 && !route.includes('.');

	const {
		domain,
		subdomainData,
		paymentTokenInfo,
		metrics,
		domainMetadata,
		isNFTView,
	} = useDataContainer(domainId);

	return (
		<main
			className={cx(styles.Main, {
				isRoot: isRoot,
			})}
		>
			{!isNFTView && (
				<Domains
					isRoot={isRoot}
					domain={domain}
					metrics={metrics}
					subdomainData={subdomainData}
					domainMetadata={domainMetadata}
					paymentTokenInfo={paymentTokenInfo}
				/>
			)}

			{isNFTView && (
				<NFT
					domain={domain}
					metrics={metrics}
					domainMetadata={domainMetadata}
					paymentTokenInfo={paymentTokenInfo}
				/>
			)}
		</main>
	);
};
