import { FC } from 'react';

import { StatsList } from '../../ui/StatsList';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';
import { truncateAddress } from '../../../lib/util/domains/domains';
import { getHashFromIPFSUrl } from '../../../lib/util/ipfs.ts/ipfs';

import styles from './TokenHashInfo.module.scss';

type TokenHashInfoProps = {
	domainId: string;
};

export const TokenHashInfo: FC<TokenHashInfoProps> = ({ domainId }) => {
	const { domain } = useDataContainer(domainId);

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
		<div className={styles.Container}>
			<StatsList stats={stats} />
		</div>
	);
};
