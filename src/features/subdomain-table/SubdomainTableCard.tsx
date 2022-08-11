//- React Imports
import { FC } from 'react';

//- Library Imports
import { ethers } from 'ethers';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Hook Imports
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../lib/util/number/number';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';

type SubdomainTableCardProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onClick: (domainName: string) => void;
};

const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);
	const handleItemClick = () => onClick(domainName);

	return (
		<button style={{ background: 'none' }} onClick={handleItemClick}>
			<div>{domainMetadata?.title} </div>
			<div>0://{domainName}</div>
			Top Bid
			<div>
				{domainMetrics?.highestBid
					? formatEthers(domainMetrics?.highestBid)
					: 0}{' '}
				{paymentTokenData?.name}{' '}
			</div>
			<div>
				$
				{domainMetrics?.highestBid
					? formatNumber(
							Number(ethers.utils.formatEther(domainMetrics?.highestBid)) *
								Number(paymentTokenData?.price),
					  )
					: 0}{' '}
			</div>
			<button style={{ background: 'purple' }}>
				{buyNowPrice ? 'Buy' : 'Bid'}
			</button>
		</button>
	);
};

export default SubdomainTableCard;
