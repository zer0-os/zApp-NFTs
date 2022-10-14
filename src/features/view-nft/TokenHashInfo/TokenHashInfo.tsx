import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useDataContainer } from '../../../lib/hooks/useDataContainer';
import {
	getEtherscanLink,
	truncateAddress,
} from '../../../lib/util/domains/domains';
import {
	getHashFromIPFSUrl,
	getWebIPFSUrlFromHash,
} from '../../../lib/util/ipfs.ts/ipfs';

import { Domain } from '@zero-tech/zns-sdk';

import { StatsList } from '../../ui/StatsList';
import { ArrowLink } from '@zero-tech/zui/components/Link/ArrowLink';

import styles from './TokenHashInfo.module.scss';

type TokenHashInfoProps = {
	domain: Domain;
};

export const TokenHashInfo: FC<TokenHashInfoProps> = ({ domain }) => {
	const { chainId } = useWeb3();
	const { isDomainDataLoading } = useDataContainer(domain?.id);
	const ipfsHash = domain ? getHashFromIPFSUrl(domain?.metadataUri) : '';
	const webIpfsUrl = getWebIPFSUrlFromHash(ipfsHash);
	const etherscanLink = getEtherscanLink(domain, chainId);

	const stats = [
		{
			title: 'Token ID',
			value: {
				isLoading: isDomainDataLoading,
				text: truncateAddress(domain?.id),
			},
			text: {
				isLoading: isDomainDataLoading,
				text: (
					<ArrowLink
						className={styles.Link}
						href={etherscanLink}
						isLinkToExternalUrl
					>
						View on Etherscan
					</ArrowLink>
				),
			},
		},
		{
			title: 'IPFS Hash',
			value: {
				isLoading: !ipfsHash,
				text: truncateAddress(ipfsHash),
			},
			text: {
				isLoading: !ipfsHash,
				text: (
					<ArrowLink
						className={styles.Link}
						href={webIpfsUrl}
						isLinkToExternalUrl
					>
						View on IPFS
					</ArrowLink>
				),
			},
		},
	];

	return (
		<div className={styles.Container}>
			{/* TODO: convert Text Stack text props to take node */}
			<StatsList stats={stats} />
		</div>
	);
};

// remove usememe
