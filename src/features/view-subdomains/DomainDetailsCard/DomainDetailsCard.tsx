import { FC } from 'react';

import { getDomainId } from '../../../lib/util/domains/domains';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { SkeletonText, SkeletonTextProps } from '@zero-tech/zui';
import { ArrowLink } from '@zero-tech/zui';

import { SubdomainViewSelector } from '../selectors';

import styles from './DomainDetailsCard.module.scss';

export interface DetailsCardProps {
	zna: string;
}

export const DomainDetailsCard: FC<DetailsCardProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const title: SkeletonTextProps['asyncText'] = {
		text: metadata?.title,
		isLoading: isLoadingMetadata,
	};

	const description: SkeletonTextProps['asyncText'] = {
		text: metadata?.description,
		isLoading: isLoadingMetadata,
	};

	return (
		<div
			className={styles.Container}
			data-testid={SubdomainViewSelector.VIEW_SUBDOMAINS_DETAILS_CARD_CONTAINER}
		>
			<div className={styles.Content}>
				<Title title={title} />
				<Description description={description} />
				<NftViewLink zna={`/${zna}/nfts?view=true`} />
			</div>
		</div>
	);
};

/*******************
 * Title
 *******************/

interface TitleProps {
	title: SkeletonTextProps['asyncText'];
}

const Title = ({ title }: TitleProps) => {
	return (
		<SkeletonText
			as={'h1'}
			className={styles.Title}
			asyncText={title}
			skeletonOptions={{ width: '50%' }}
		/>
	);
};

/*******************
 * Description
 *******************/

interface DescriptionProps {
	description: SkeletonTextProps['asyncText'];
}

const Description = ({ description }: DescriptionProps) => {
	return (
		<SkeletonText
			className={styles.Description}
			as={'p'}
			asyncText={description}
		/>
	);
};

/*******************
 * Nft View Link
 *******************/

interface NftViewLinkProps {
	zna: string;
}

const NftViewLink = ({ zna }: NftViewLinkProps) => {
	return (
		<div className={styles.LinkContainer}>
			<ArrowLink className={styles.Link} href={zna} replace>
				View Domain NFT
			</ArrowLink>
		</div>
	);
};
