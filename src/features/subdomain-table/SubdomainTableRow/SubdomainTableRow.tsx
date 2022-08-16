//- React Imports
import { FC } from 'react';

//- Library Imports
import { ethers } from 'ethers';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Hook Imports
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { useBuyNowPrice } from '../../../lib/hooks/useBuyNowPrice';

//- Components Imports
import Button from 'zero-ui/src/components/Button/index';

//- Constants Imports
import { ModalType } from '../../../lib/constants/modals';

type SubdomainTableRowProps = {
	accountId?: string;
	domainId: string;
	domainName: string;
	domainOwner: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onRowClick: (e?: any, domainName?: string) => void;
	onButtonClick: (domainName: string, type: ModalType) => void;
};

const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
	accountId,
	domainId,
	domainName,
	domainOwner,
	domainMetadataUri,
	paymentTokenData,
	onRowClick,
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
		<>
			<tr
				onClick={(e) => onRowClick(e, domainName)}
				style={{ cursor: 'pointer' }}
			>
				<td>
					<div>{domainMetadata?.title}</div>
					<div>0://{domainName}</div>
				</td>
				<td style={{ textAlign: 'right' }}>
					<div>
						{domainMetrics?.volume.all
							? formatEthers(domainMetrics?.volume.all)
							: 0}{' '}
						{paymentTokenData?.name}
					</div>
					<div>
						$
						{domainMetrics?.volume.all
							? formatNumber(
									Number(ethers.utils.formatEther(domainMetrics?.volume.all)) *
										paymentTokenData?.price,
							  )
							: 0}{' '}
					</div>
				</td>

				<td style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						className="button"
						onPress={() => onButtonClick(domainName, actionType)}
						isDisabled={isOwnedByUser}
					>
						{buyNowPrice ? 'BUY' : 'BID'}
					</Button>
				</td>
			</tr>
		</>
	);
};

export default SubdomainTableRow;
