//- React Imports
import type { FC } from 'react';

//- Hook Imports
import { useSubdomainData } from '../../lib/hooks/useSubdomainData';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { usePaymentTokenInfo } from '../../lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';

//- Features Imports
import SubdomainTable from '../../features/subdomain-table/SubdomainTable';
import SubdomainViewStats from '../../features/stats/SubdomainViewStats';
import PreviewCard from '../../features/preview-card/PreviewCard';

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

	const isSubdomainData = subdomainData?.length >= 1;
	const isRoot = domain?.name === 'wilder';

	// Preview Card and conditions WIP
	return (
		<div style={{ paddingTop: '100px' }}>
			{!isRoot && isSubdomainData && (
				<PreviewCard
					title={domainMetadata?.title}
					description={domainMetadata?.description}
					href={`/${domain?.name}/nfts?view=true`}
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
