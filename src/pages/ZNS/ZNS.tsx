//- React Imports
import type { FC } from 'react';

//- Hook Imports
import { useSubdomainData } from '../../lib/hooks/useSubdomainData';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { usePaymentTokenInfo } from '../../lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';

//- Features Imports
import SubdomainTable from '../../features/subdomain-table/SubdomainTable';
import SubdomainViewStats from '../../features/stats/SubdomainViewStats';
import PreviewCard from '../../features/preview-card/DomainPreview';

//- Utils Imports
import { getDomainId } from '../../lib/util/domains/domains';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';

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

	const isSubdomainData = subdomainData?.length >= 1;
	const isRoot = domain?.name === 'wilder';

	return (
		<div style={{ paddingTop: '100px' }}>
			{!isRoot && (
				<PreviewCard
					title={domainMetadata?.title}
					description={domainMetadata?.description}
				/>
			)}
			<br />
			<br />

			<SubdomainViewStats
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<br />
			{isSubdomainData && (
				<SubdomainTable
					subdomainData={subdomainData}
					paymentTokenData={paymentTokenInfo}
				/>
			)}
			{!isSubdomainData && <h1>NFT View</h1>}
		</div>
	);
};

export default ZNS;
