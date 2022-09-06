//- React Imports
import { FC } from 'react';

//- Components Imports
import HistoryList from '../../features/view-nft/HistoryList/HistoryList';
import TokenHashInfo from '../../features/view-nft/TokenHashInfo/TokenHashInfo';
import NFTMetrics from '../../features/view-nft/NFTMetrics/NFTMetrics';
import DomainPreview from '../../features/domain-preview/DomainPreview';
import Actions from '../../features/view-nft/Actions/Actions';

//- Library Imports
import { Domain, DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Types Imports
import { Metadata } from '../../lib/types/metadata';

type NFTContainerProps = {
	domain: Domain;
	metrics: DomainMetrics;
	domainMetadata: Metadata;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTContainer: FC<NFTContainerProps> = ({
	domain,
	metrics,
	domainMetadata,
	paymentTokenInfo,
}) => {
	return (
		<>
			<DomainPreview
				title={domainMetadata?.title}
				description={domainMetadata?.description}
				owner={domain?.owner}
				creator={domain?.minter}
				isNFTView
			/>

			<Actions
				domain={domain}
				domainMetadata={domainMetadata}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<NFTMetrics
				domainId={domain?.id}
				metrics={metrics}
				paymentTokenInfo={paymentTokenInfo}
			/>

			<TokenHashInfo domain={domain} />

			<HistoryList domainId={domain?.id} paymentToken={paymentTokenInfo} />
		</>
	);
};

export default NFTContainer;
