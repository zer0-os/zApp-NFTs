//- React Imports
import { FC, useMemo } from 'react';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk';

//- Features Imports
import StatsWidget from '../StatsWidget/StatsWidget';

//- Utils Imports
import { truncateAddress } from '../../../lib/util/domains/domains';
import { getHashFromIPFSUrl } from '../../../lib/util/ipfs.ts/ipfs';

type TokenHashInfoProps = {
	domain: Domain;
};

const TokenHashInfo: FC<TokenHashInfoProps> = ({ domain }) => {
	const ipfsHash = useMemo(() => {
		if (domain) {
			return getHashFromIPFSUrl(domain?.metadataUri);
		}

		return '';
	}, [domain]);

	const stats = [
		{
			title: 'Token ID',
			value: domain && truncateAddress(domain?.id),
			text: 'View on Etherscan ->',
		},
		{
			title: 'IPFS Hash',
			value: ipfsHash && truncateAddress(ipfsHash),
			text: 'View on IPFS ->',
		},
	];

	return (
		<div style={{ marginTop: '16px' }}>
			<StatsWidget stats={stats} />
		</div>
	);
};

export default TokenHashInfo;
