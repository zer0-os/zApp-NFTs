import { FC, useMemo } from 'react';

import { Domain } from '@zero-tech/zns-sdk';

import { StatsList } from '../../ui/StatsList/StatsList';

import { truncateAddress } from '../../../lib/util/domains/domains';
import { getHashFromIPFSUrl } from '../../../lib/util/ipfs.ts/ipfs';

type TokenHashInfoProps = {
	domain: Domain;
};

export const TokenHashInfo: FC<TokenHashInfoProps> = ({ domain }) => {
	const ipfsHash = domain ? getHashFromIPFSUrl(domain?.metadataUri) : '';

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
			<StatsList stats={stats} />
		</div>
	);
};
