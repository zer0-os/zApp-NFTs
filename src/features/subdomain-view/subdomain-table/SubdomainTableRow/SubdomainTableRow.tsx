//- React Imports
import { FC } from 'react';

//- Library Imports
import { ethers } from 'ethers';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Hook Imports
import { useDomainMetadata } from '../../../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../../../lib/util/number/number';
import { useBuyNowPrice } from '../../../../lib/hooks/useBuyNowPrice';

//- Component Imports
import { PlaceBidButton } from '../../../../features/place-bid';
import { BuyNowButton } from '../../../../features/buy-now';

type SubdomainTableRowProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onRowClick: (e?: any, domainName?: string) => void;
};

const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onRowClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);

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
					{buyNowPrice ? <BuyNowButton /> : <PlaceBidButton />}
				</td>
			</tr>
		</>
	);
};

export default SubdomainTableRow;
