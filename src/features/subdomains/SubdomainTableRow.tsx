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

type SubdomainTableRowProps = {
	domain: Domain;
	paymentTokenData: TokenPriceInfo;
};

const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
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
		<tr onClick={onClick} style={{ cursor: 'pointer' }}>
			<td>
				<div>{domainMetadata?.title}</div>
				<div>0://{domain?.name}</div>
			</td>
			<td>
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
