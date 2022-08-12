//- React Imports
import { FC } from 'react';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Features Imports
import SubdomainTable from '../../features/subdomain-table/SubdomainTable';
import SubdomainViewStats from '../../features/ui/Stats/SubdomainViewStats';
import PreviewCard from '../../features/ui/PreviewCard/PreviewCard';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type SubdomainViewContainerProps = {
	domain: Domain;
	domainMetadata: Metadata;
	metrics: DomainMetrics;
	paymentTokenInfo: TokenPriceInfo;
	subdomainData: Domain[];
};

const SubdomainViewContainer: FC<SubdomainViewContainerProps> = ({
	domain,
	domainMetadata,
	metrics,
	paymentTokenInfo,
	subdomainData,
}) => {
	const isRoot = domain?.name === 'wilder';

	return (
		<>
			{!isRoot && (
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

			<SubdomainTable
				subdomainData={subdomainData}
				paymentTokenData={paymentTokenInfo}
			/>
		</>
	);
};

export default SubdomainViewContainer;
