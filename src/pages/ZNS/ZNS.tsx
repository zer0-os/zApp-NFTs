//- React Imports
import { FC } from 'react';

//- Hook Imports
import { useSubdomainData } from '../../lib/hooks/useSubdomainData';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { usePaymentTokenInfo } from '../../lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useViewNavigation } from '../../lib/hooks/useViewNavigation';

//- Container Imports
import Domains from '../Domains/Domains';
import NFT from '../NFT/NFT';

//- Utils Imports
import { getDomainId } from '../../lib/util/domains/domains';

type ZNSProps = {
	route: string;
};

const ZNS: FC<ZNSProps> = ({ route }) => {
	const domainId = getDomainId(route);
	const { data: domain } = useDomainData(domainId);
	const { data: subdomainData } = useSubdomainData(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: metrics } = useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { isNFTView } = useViewNavigation(subdomainData);

	return (
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
	);
};

export default ZNS;
