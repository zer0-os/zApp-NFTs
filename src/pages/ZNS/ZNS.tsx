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
import SubdomainView from '../../features/subdomain-view/SubdomainView';
import NFTView from '../../features/nft-view/NFTView';

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
		<div style={{ padding: '200px' }}>
			{!isNFTView && (
				<SubdomainView
					domain={domain}
					metrics={metrics}
					subdomainData={subdomainData}
					domainMetadata={domainMetadata}
					paymentTokenInfo={paymentTokenInfo}
				/>
			)}

			{isNFTView && (
				<NFTView
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
