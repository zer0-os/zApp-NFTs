//- React Imports
import { FC } from 'react';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Features Imports
import SubdomainTable from '../../features/view-subdomains/SubdomainTable/SubdomainTable';
import SubdomainMetrics from '../../features/view-subdomains/SubdomainMetrics/SubdomainMetrics';
import DomainPreview from '../../features/domain-preview/DomainPreview';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type DomainsContainerProps = {
	route: string;
	domain: Domain;
	metrics: DomainMetrics;
	subdomainData: Domain[];
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
};

const DomainsContainer: FC<DomainsContainerProps> = ({
	route,
	domain,
	metrics,
	subdomainData,
	domainMetadata,
	paymentTokenInfo,
	isSubdomainDataLoading,
}) => {
	const isRoot = route.split('.').length === 1 && !route.includes('.');

	return (
		<>
			{!isRoot && (
				<DomainPreview
					title={domainMetadata?.title}
					description={domainMetadata?.description}
					href={`/${domain?.name}/nfts?view=true`}
				/>
			)}

			<SubdomainMetrics metrics={metrics} paymentTokenInfo={paymentTokenInfo} />

			<SubdomainTable
				subdomainData={subdomainData}
				paymentTokenData={paymentTokenInfo}
				isSubdomainDataLoading={isSubdomainDataLoading}
			/>
		</>
	);
};

export default DomainsContainer;
