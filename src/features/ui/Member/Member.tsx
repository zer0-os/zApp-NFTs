import React from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { AsyncText } from '@zero-tech/zui/lib/types';
import { truncateAddress } from '@zero-tech/zui/utils/formatting/addresses';
import { getEtherscanWalletUrl } from '@zero-tech/zapp-utils/web3/etherscan';

import { SkeletonText } from '@zero-tech/zui/components';

import styles from './Member.module.scss';

export interface MemberProps {
	title: string;
	walletAddress: string | AsyncText;
	variant?: 'primary' | 'secondary';
}

export const Member = ({
	title,
	walletAddress,
	variant = 'primary',
}: MemberProps) => {
	const { chainId } = useWeb3();

	const isAsyncText = typeof walletAddress === 'object';
	const address = isAsyncText ? walletAddress.text : walletAddress;
	const url = address ? getEtherscanWalletUrl(address, chainId) : undefined;

	return (
		<div className={styles.Member}>
			<label className={styles.Title} data-variant={variant}>
				{title}
			</label>
			<Link href={url}>
				<Address walletAddress={walletAddress} />
			</Link>
		</div>
	);
};

/*************************
 * Link
 *************************/

interface LinkProps {
	href?: string;
	children: React.ReactNode;
}

const Link = ({ href, children }: LinkProps) => {
	if (href) {
		return (
			<a
				href={href}
				target={'_blank'}
				rel={'noreferrer'}
				className={styles.Address}
			>
				{children}
			</a>
		);
	} else {
		return <span className={styles.Title}>{children}</span>;
	}
};

/*************************
 * Address
 *************************/

interface AddressProps {
	walletAddress: MemberProps['walletAddress'];
}

const Address = ({ walletAddress }: AddressProps) => {
	if (typeof walletAddress === 'string') {
		return <span>{truncateAddress(walletAddress)}</span>;
	}

	const truncatedAddress = walletAddress.text
		? truncateAddress(walletAddress.text as string)
		: walletAddress.text;

	return (
		<SkeletonText
			asyncText={{
				...walletAddress,
				// Reassign text to truncated address
				text: truncatedAddress,
			}}
		/>
	);
};
