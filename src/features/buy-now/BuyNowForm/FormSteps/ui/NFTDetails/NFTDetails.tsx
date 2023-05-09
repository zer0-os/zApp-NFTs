import React, { FC } from 'react';

import { Step } from '../../hooks';
import { useBuyNowData } from '../../../../useBuyNowData';
import { HTMLTextElement } from '@zero-tech/zui/lib/types';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { SkeletonText, TextStack } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTDetails.module.scss';

export interface NFTDetailsProps {
	zna: string;
	step?: Step;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna, step }) => {
	const {
		title,
		creator,
		imageAlt,
		imageSrc,
		highestBidAsString,
		buyNowPriceAsString,
		isLoading,
	} = useBuyNowData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);

	const detailContent: DetailsContentType[] = [
		{
			id: 'creator',
			title: 'Creator',
			className: styles.InfoValue,
			text: truncatedCreatorAddress,
			isLoading: isLoading,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			className: styles.InfoValue,
			text: highestBidAsString,
			isLoading: isLoading,
			as: 'span' as const,
		},
		{
			id: 'buy-now-price',
			title: 'Buy Now Price',
			className: styles.InfoValue,
			text: buyNowPriceAsString,
			isLoading: isLoading,
			as: 'span' as const,
		},
	];

	const content =
		step === Step.COMPLETE ? detailContent.slice(0, -1) : detailContent;

	return (
		<div className={styles.Container}>
			<Media alt={imageAlt} src={imageSrc} />
			<Details
				content={content}
				isLoadingTitle={isLoading}
				truncatedZna={truncatedZna}
				title={title}
			/>
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
	truncatedZna: string;
	isLoadingTitle: boolean;
	title?: string;
}

const Details = ({
	content,
	truncatedZna,
	isLoadingTitle,
	title,
}: DetailsProps) => {
	return (
		<div className={styles.Details}>
			<div className={styles.Domain}>
				<h2 className={styles.Title}>
					<SkeletonText
						asyncText={{ isLoading: isLoadingTitle, text: title }}
					/>
				</h2>
				<span className={styles.ZNA}>0://{truncatedZna}</span>
			</div>
			<ul className={styles.TextContent}>
				{content.map((e) => (
					<li key={e.id}>
						<TextStack
							label={e.title}
							primaryText={{
								text: e.text,
								isLoading: e.isLoading,
							}}
							secondaryText={''}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
