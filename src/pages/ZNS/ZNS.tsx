//- React Imports
import type { FC } from 'react';

//- Hook Imports
import { useSubdomainData } from '../../lib/hooks/useSubdomainData';
import { useDomain } from '../../lib/hooks/useDomain';
import { usePaymentTokenInfo } from '../../lib/hooks/usePaymentTokenInfo';

//- Features Imports
import SubdomainTable from '../../features/subdomains/SubdomainTable';
import StatsWidget from '../../features/stats-widget/StatsWidget';

//- Utils Imports
import { getDomainId } from '../../lib/util/domains/domains';

type ZNSProps = {
	route: string;
};

const ZNS: FC<ZNSProps> = ({ route }) => {
	const domainId = getDomainId(route);
	const { domain } = useDomain(domainId);
	const { subdomainData } = useSubdomainData(domainId);
	const { paymentTokenData } = usePaymentTokenInfo(domainId);
	const isSubdomainData = subdomainData?.length >= 1;
	const isRoot = domain?.name === 'wilder';

	const onClick = () => {
		console.log('onClick');
	};

	return (
		<div style={{ paddingTop: '100px' }}>
			<div>Current Domain: {domain?.name}</div>
			{!isRoot && (
				<button style={{ background: 'purple' }} onClick={onClick}>
					{'View Domain NFT ->'}
				</button>
			)}
			<br />
			<br />
			<div>
				<StatsWidget domainId={domainId} isNFTView={!isSubdomainData} />
			</div>
			<br />
			{isSubdomainData && (
				<SubdomainTable
					subdomainData={subdomainData}
					paymentTokenData={paymentTokenData}
				/>
			)}
			{!isSubdomainData && <h1>NFT View</h1>}
		</div>
	);
};

export default ZNS;
