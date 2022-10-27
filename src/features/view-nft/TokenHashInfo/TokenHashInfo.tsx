import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import {
	getDomainId,
	getEtherscanLink,
	truncateAddress,
} from '../../../lib/util/domains/domains';
import {
	getHashFromIPFSUrl,
	getWebIPFSUrlFromHash,
} from '../../../lib/util/ipfs/ipfs';

import { StatsList } from '../../ui';
import { ArrowLink } from '@zero-tech/zui/components/Link/ArrowLink';

import styles from './TokenHashInfo.module.scss';
import { useDomainData } from '../../../lib/hooks/useDomainData';

type TokenHashInfoProps = {
	zna: string;
};

export const TokenHashInfo: FC<TokenHashInfoProps> = ({ zna }) => {
	const { chainId } = useWeb3();
	const domainId = getDomainId(zna);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const ipfsHash = domain ? getHashFromIPFSUrl(domain.metadataUri) : undefined;
	const webIpfsUrl = ipfsHash ? getWebIPFSUrlFromHash(ipfsHash) : undefined;
	const etherscanLink = domain ? getEtherscanLink(domain, chainId) : undefined;

	const stats = [
		{
			title: 'Token ID',
			value: {
				isLoading: isLoadingDomain,
				text: truncateAddress(domainId),
			},
			text: {
				isLoading: isLoadingDomain,
				text: <EtherscanLink link={etherscanLink} />,
			},
		},
		{
			title: 'IPFS Hash',
			value: {
				isLoading: isLoadingDomain,
				text: truncateAddress(ipfsHash),
			},
			text: {
				isLoading: !ipfsHash,
				text: <WebIpfsUrl webIpfsUrl={webIpfsUrl} />,
			},
		},
	];

	return (
		<div className={styles.Container}>
			<StatsList stats={stats} />
		</div>
	);
};

/***************************
 * Etherscan Link
 ***************************/

interface EtherscanLinkProps {
	link?: string;
}

const EtherscanLink = ({ link }: EtherscanLinkProps) => {
	return link ? (
		<ArrowLink className={styles.Link} href={link} isLinkToExternalUrl>
			View on Etherscan
		</ArrowLink>
	) : undefined;
};

/***************************
 * Web Ipfs Url
 ***************************/

interface WebIpfsUrlProps {
	webIpfsUrl?: string;
}

const WebIpfsUrl = ({ webIpfsUrl }: WebIpfsUrlProps) => {
	return webIpfsUrl ? (
		<ArrowLink className={styles.Link} href={webIpfsUrl} isLinkToExternalUrl>
			View on IPFS
		</ArrowLink>
	) : undefined;
};
