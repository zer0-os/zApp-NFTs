/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC } from 'react';

//- Types Imports
import { AppProps } from './lib/types/app';

//- Hook Imports
import { useSubdomainData } from './lib/hooks/useSubdomainData';
import { useDomainData } from './lib/hooks/useDomainData';
import { usePaymentTokenInfo } from './lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from './lib/hooks/usePaymentTokenForDomain';
import { useDomainMetadata } from './lib/hooks/useDomainMetadata';
import { useDomainMetrics } from './lib/hooks/useDomainMetrics';
import { useViewNavigation } from './lib/hooks/useViewNavigation';

//- Container Imports
import Domains from './pages/Domains/Domains';
import NFT from './pages/NFT/NFT';

//- Utils Imports
import { getDomainId } from './lib/util/domains/domains';

const App: FC<AppProps> = ({ provider, route }) => {
	console.log('prov (marketplace-dapp):', provider);
	console.log('route (marketplace-dapp):', route);

	const domainId = getDomainId(route);
	const { data: domain } = useDomainData(domainId);
	const { data: subdomainData } = useSubdomainData(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: metrics } = useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { isNFTView } = useViewNavigation(subdomainData);

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

export default App;
