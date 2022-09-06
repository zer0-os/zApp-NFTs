/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC } from 'react';

//- Types Imports
import { AppProps } from './lib/types/app';

//- Hook Imports
import { useDataContainer } from './lib/hooks/useDataContainer';

//- Container Imports
import { Domains } from './pages/Domains/Domains';
import { NFT } from './pages/NFT/NFT';

//- Utils Imports
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
