//- React Imports
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

//- Library Imports
import { ethers } from 'ethers';
import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Hook Imports
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../lib/util/number/number';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';

type SubdomainTableCardProps = {
	domain: Domain;
	paymentTokenData: TokenPriceInfo;
};

const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	domain,
	paymentTokenData,
}) => {
	const { push: goTo } = useHistory();
	const { domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { domainMetrics } = useDomainMetrics(domain?.id);
	const { buyNowPrice } = useBuyNowPrice(domain?.id);

	const onClick = () => {
		goTo(`/${domain?.name}/nfts`);
		console.log('onClick');
	};

	return (
		<button style={{ background: 'none' }} onClick={onClick}>
			<div>{domainMetadata?.title} </div>
			<div>0://{domain?.name}</div>
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
