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

//- Provider Imports
import { ModalProvider } from '../../lib/providers/ModalProvider';

//- Container Imports
import SubdomainView from '../../containers/subdomain-view/SubdomainView';
import NFTView from '../../containers/nft-view/NFTView';

//- Utils Imports
import { getDomainId } from '../../lib/util/domains/domains';

type ZNSProps = {
	route: string;
	user: { account: string };
};

const ZNS: FC<ZNSProps> = ({ route, user }) => {
	const domainId = getDomainId(route);
	const { data: domain } = useDomainData(domainId);
	const { data: subdomainData, isLoading: isSubdomainDataLoading } =
		useSubdomainData(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: metrics } = useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { isNFTView } = useViewNavigation(subdomainData);

	return (
		<ModalProvider>
			<div style={{ paddingTop: '100px' }}>
				{!isNFTView && (
					<SubdomainView
						accountId={user.account}
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
						paymentTokenInfo={paymentTokenInfo}
					/>
				)}
			</div>
		</ModalProvider>
	);
};

export default ZNS;
