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

type SubdomainTableRowProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onClick: (domainName: string) => void;
};

const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
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
		<tr onClick={handleItemClick} style={{ cursor: 'pointer' }}>
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

			<td>
				<button style={{ background: 'purple' }}>
					{buyNowPrice ? 'Buy' : 'Bid'}
				</button>
			</td>
		</tr>
	);
};

export default SubdomainTableRow;
