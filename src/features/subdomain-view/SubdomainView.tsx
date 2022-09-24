//- React Imports
import { FC } from 'react';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

//- Features Imports
import SubdomainTable from './subdomain-table/SubdomainTable/SubdomainTable';
import SubdomainViewStats from '../ui/Stats/SubdomainViewStats';
import NFTCard from '../ui/NFTCard/NFTCard';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

type SubdomainViewContainerProps = {
	accountId: string;
	domain: Domain;
	metrics: DomainMetrics;
	subdomainData: Domain[];
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
	openModal: (domainName?: string, type?: ModalType) => void;
};

const SubdomainViewContainer: FC<SubdomainViewContainerProps> = ({
	accountId,
	domain,
	metrics,
	subdomainData,
	domainMetadata,
	paymentTokenInfo,
	isSubdomainDataLoading,
	openModal,
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
				accountId={accountId}
				subdomainData={subdomainData}
				paymentTokenData={paymentTokenInfo}
				isSubdomainDataLoading={isSubdomainDataLoading}
				openModal={openModal}
			/>
		</>
	);
};

export default SubdomainViewContainer;
