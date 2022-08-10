//- React Imports
import type { FC } from 'react';

//- Library Imports
import { ethers } from 'ethers';

//- Hook Imports
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../lib/util/number/number';
import { usePaymentTokenInfo } from '../../lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';

type StatsWidgetProps = {
	domainId: string;
	isNFTView: boolean;
};

const StatsWidget: FC<StatsWidgetProps> = ({ domainId, isNFTView }) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenData } = usePaymentTokenInfo(paymentToken);

	const metricsNFTView = () => {
		return (
			<>
				<div>Bids: {domainMetrics?.numberOfBids}</div>
				<div>
					Last Sale:{' '}
					{domainMetrics?.lastSale
						? `${formatEthers(domainMetrics?.lastSale)} WILD`
						: 'No sales'}
				</div>
				<div>
					Volume:{' '}
					{(domainMetrics?.volume as any)?.all
						? `${formatEthers((domainMetrics?.volume as any)?.all)} WILD`
						: String(0)}
				</div>
			</>
		);
	};

	const metricsSubdomainView = () => {
		return (
			<>
				STATS:
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginRight: '16px',
						}}
					>
						<div>Items In Domain</div>
						<div>{domainMetrics?.items}</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginRight: '16px',
						}}
					>
						<div>Floor Price</div>
						<div>
							{domainMetrics?.lowestSale
								? `${formatEthers(domainMetrics?.lowestSale)} ${
										paymentTokenData?.name
								  }`
								: 'No sales'}
						</div>
						<div>
							$
							{domainMetrics?.lowestSale && paymentTokenData?.price
								? formatNumber(
										Number(
											ethers.utils.formatEther(domainMetrics?.lowestSale),
										) * paymentTokenData?.price,
								  )
								: 0}{' '}
						</div>
					</div>
					<div>
						<div>Volume</div>
						<div>
							{(domainMetrics?.volume as any)?.all
								? `${formatEthers((domainMetrics?.volume as any)?.all)} ${
										paymentTokenData?.name
								  }`
								: String(0)}
						</div>
						<div>
							$
							{(domainMetrics?.volume as any)?.all && paymentTokenData?.price
								? formatNumber(
										Number(
											ethers.utils.formatEther(domainMetrics?.volume?.all),
										) * paymentTokenData?.price,
								  )
								: 0}{' '}
						</div>
					</div>
				</div>
			</>
		);
	};

	return <div>{isNFTView ? metricsNFTView() : metricsSubdomainView()}</div>;
};

export default StatsWidget;
