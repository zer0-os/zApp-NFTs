//- React Imports
import { FC } from 'react';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Features Imports
import SubdomainTable from '../../features/subdomain-view/SubdomainTable/SubdomainTable';
import SubdomainViewStats from '../../features/ui/Stats/SubdomainViewStats';
import NFTCard from '../../features/ui/NFTCard/NFTCard';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type DomainsContainerProps = {
	domain: Domain;
	metrics: DomainMetrics;
	subdomainData: Domain[];
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
};

const DomainsContainer: FC<DomainsContainerProps> = ({
	domain,
	metrics,
	subdomainData,
	domainMetadata,
	paymentTokenInfo,
	isSubdomainDataLoading,
}) => {
	const isRoot = domain?.name === 'wilder';

	return (
		<>
			{!isRoot && (
				<NFTCard
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
				isSubdomainDataLoading={isSubdomainDataLoading}
			/>
		</>
	);
};

export default DomainsContainer;
