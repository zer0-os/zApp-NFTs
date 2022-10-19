import { FC } from 'react';

import { Metadata } from '../../lib/types/metadata';

import {
	SubdomainMetrics,
	SubdomainTable,
} from '../../features/view-subdomains';
import { DomainPreview } from '../../features/domain-preview';

import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type DomainsContainerProps = {
	isRoot: boolean;
	domain: Domain;
	metrics: DomainMetrics;
	subdomainData: Domain[];
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
};

export const Domains: FC<DomainsContainerProps> = ({
	isRoot,
	domain,
	subdomainData,
	domainMetadata,
	paymentTokenInfo,
	isSubdomainDataLoading,
}) => {
	return (
		<>
			{!isRoot && (
				<DomainPreview
					title={domainMetadata?.title}
					description={domainMetadata?.description}
					banner={domainMetadata?.image_full ?? domainMetadata?.image}
					href={`/${domain?.name}/nfts?view=true`}
					icon={domainMetadata?.previewImage ?? domainMetadata?.image}
				/>
			)}

			<SubdomainMetrics
				domainId={domain?.id}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<SubdomainTable
				subdomainData={subdomainData}
				paymentTokenData={paymentTokenInfo}
				isSubdomainDataLoading={isSubdomainDataLoading}
			/>
		</>
	);
};
