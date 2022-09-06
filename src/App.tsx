import { FC } from 'react';

import { AppProps } from './lib/types/app';

import { useDataContainer } from './lib/hooks/useDataContainer';

import { Domains } from './pages/Domains';
import { NFT } from './pages/NFT';

import { getDomainId } from './lib/util/domains/domains';

export const App: FC<AppProps> = ({ provider, route }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	const domainId = getDomainId(route);

	const {
		domain,
		subdomainData,
		paymentTokenInfo,
		metrics,
		domainMetadata,
		isNFTView,
	} = useDataContainer(domainId);

	return (
		<main>
			<div style={{ padding: '100px 150px' }}>
				{!isNFTView && (
					<Domains
						route={route}
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
			</div>
		</main>
	);
};
