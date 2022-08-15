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

//- Components Imports
import Button from 'zero-ui/src/components/Button/index';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

type SubdomainTableCardProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onCardClick: (e?: any, domainName?: string) => void;
	onButtonClick: (domainName: string, type: ModalType) => void;
};

const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onCardClick,
	onButtonClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);

	const actionType = buyNowPrice ? ModalType.BUY_NOW : ModalType.PLACE_BID;

	return (
		<button
			style={{ background: 'none' }}
			onClick={(e) => onCardClick(e, domainName)}
		>
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
			<Button
				onPress={() => onButtonClick(domainName, actionType)}
				className="button"
			>
				{actionType}
			</Button>
		</button>
	);
};

export default SubdomainTableCard;
