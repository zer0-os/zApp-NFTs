import { FC } from 'react';

import { formatEthers } from '../../../../../../lib/util/number';
import { useTransferOwnershipData } from '../../../../useTransferOwnershipData';
import { HTMLTextElement } from '@zero-tech/zui/lib/types';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { SkeletonText } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTDetails.module.scss';

export interface NFTDetailsProps {
	zna: string;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna }) => {
	const {
		title,
		creator,
		imageAlt,
		imageSrc,
		highestBid,
		paymentTokenSymbol,
		isLoading,
	} = useTransferOwnershipData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);

	const formattedHighestBid = highestBid
		? `${formatEthers(highestBid?.amount)} ${paymentTokenSymbol}`
		: '-';

	const detailContent: DetailsContentType[] = [
		{
			id: 'title',
			className: styles.Title,
			text: title,
			isLoading: isLoading,
			as: 'h1' as const,
		},
		{
			id: 'zna',
			className: styles.ZNA,
			text: `0://${truncatedZna}`,
			isLoading: isLoading,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			className: styles.InfoValue,
			text: formattedHighestBid,
			isLoading: isLoading,
			as: 'span' as const,
		},
		{
			id: 'creator',
			title: 'Creator',
			className: styles.InfoValue,
			text: truncatedCreatorAddress,
			isLoading: isLoading,
			as: 'span' as const,
		},
	];

	return (
		<div className={styles.Container}>
			<Media alt={imageAlt} src={imageSrc} />
			<Details content={detailContent} />
		</div>
	);
};

/*******************
 * Media
 *******************/

interface MediaProps {
	alt: string;
	src: string;
}

const Media = ({ alt, src }: MediaProps) => {
	return (
		<div className={styles.Media}>
			<IpfsMedia className={styles.Image} alt={alt} src={src} />
		</div>
	);
};

/*******************
 * Details
 *******************/

type DetailsContentType = {
	id: string;
	title?: string;
	className: string;
	text: string;
	isLoading: boolean;
	as: HTMLTextElement;
};

interface DetailsProps {
	content: DetailsContentType[];
}

const Details = ({ content }: DetailsProps) => {
	return (
		<div className={styles.Details}>
			<ul className={styles.TextContent}>
				{content.map((e) => (
					<li key={e.id}>
						{e?.title && <span className={styles.InfoTitle}>{e?.title}</span>}
						<SkeletonText
							className={e?.className}
							as={e?.as}
							asyncText={{
								text: e?.text,
								isLoading: e?.isLoading,
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
