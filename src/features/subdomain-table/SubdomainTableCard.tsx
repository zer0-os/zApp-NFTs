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
	accountId: string;
	domainId: string;
	domainName: string;
	domainOwner: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onCardClick: (e?: any, domainName?: string) => void;
	onButtonClick: (domainName: string, type: ModalType) => void;
};

const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	accountId,
	domainId,
	domainName,
	domainOwner,
	domainMetadataUri,
	paymentTokenData,
	onCardClick,
	onButtonClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);

	const isOwnedByUser = accountId?.toLowerCase() === domainOwner.toLowerCase();

	const actionType = !accountId
		? ModalType.CONNECT_WALLET_PROMPT
		: buyNowPrice
		? ModalType.BUY_NOW
		: ModalType.PLACE_BID;

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
				className="button"
				onPress={() => onButtonClick(domainName, actionType)}
				isDisabled={isOwnedByUser}
			>
				{buyNowPrice ? 'BUY' : 'BID'}
			</Button>
		</button>
	);
};

export default SubdomainTableCard;
