import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useDomainData } from '../../lib/hooks/useDomainData';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { getDomainId, truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';
import { ArrowLink, SkeletonText, SkeletonTextProps } from '@zero-tech/zui/components';

import styles from './DomainPreview.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface DomainPreviewProps {
	zna: string;
	variant: 'minimal' | 'full';
}

const BannerOptions: Record<DomainPreviewProps['variant'], object> = {
	minimal: { size: 'large', fit: 'fill' },
	full: { size: 'full', fit: 'fit' },
};

export const DomainPreview: FC<DomainPreviewProps> = ({ zna, variant }) => {
	const domainId = getDomainId(zna);

	/***************************
	 * Retrieve data
	 ***************************/

	const { data: domain } = useDomainData(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	/***************************
	 * Format data
	 ***************************/

	const members: Member[] = [
		{ title: MemberTitle.CREATOR, address: domain?.minter },
		{ title: MemberTitle.OWNER, address: domain?.owner },
	];

	const title: SkeletonTextProps['asyncText'] = {
		text: metadata?.title,
		isLoading: isLoadingMetadata,
	};

	const description: SkeletonTextProps['asyncText'] = {
		text: metadata?.description,
		isLoading: isLoadingMetadata,
	};

	const altTemplate = `${metadata?.title ?? zna} nft `;

	const thumbnailAlt = altTemplate + ` thumbnail`;
	const thumbnailSrc = metadata?.previewImage ?? metadata?.image;

	const bannerAlt = altTemplate + ` banner`;
	const bannerSrc = metadata?.image_full ?? metadata?.image;

	/***************************
	 * Render
	 ***************************/

	return (
		<div className={styles.Container}>
			<div
				className={cx(styles.Banner, {
					isNFTView: variant === 'full',
				})}
			>
				<IpfsMedia
					alt={bannerAlt}
					className={styles.Media}
					src={bannerSrc}
					options={BannerOptions[variant]}
				/>
			</div>

			<div
				className={cx(styles.Content, {
					isNFTView: variant === 'full',
				})}
			>
				{variant === 'minimal' && (
					<Thumbnail alt={thumbnailAlt} src={thumbnailSrc} />
				)}

				<div className={styles.TextContainer}>
					<Title title={title} />

					{variant === 'full' && <Members members={members} />}

					<Description description={description} />

					{variant === 'minimal' && (
						<NftViewLink to={`/${zna}/nfts?view=true`} />
					)}
				</div>
			</div>
		</div>
	);
};

/*******************
 * Thumbnail
 *******************/

interface ThumbnailProps {
	src: string;
	alt: string;
}

const Thumbnail = ({ src, alt }: ThumbnailProps) => {
	return (
		<IpfsMedia
			alt={alt}
			className={styles.Icon}
			src={src}
			options={{
				size: 'medium',
			}}
		/>
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
 * Members
 *******************/

type Member = {
	title: MemberTitle;
	address: string;
};

interface MembersProps {
	members: Member[];
}

const Members = ({ members }: MembersProps) => {
	return (
		<ul className={styles.MemberContainer}>
			{members.map((member) => (
				<li key={member.title} className={styles.MemberItem}>
					<span className={styles.MemberTitle}>{member.title}</span>
					<SkeletonText
						as={'span'}
						className={styles.MemberAddress}
						asyncText={{
							text: member?.address
								? truncateAddress(member.address)
								: undefined,
							isLoading: !member?.address,
						}}
					/>
				</li>
			))}
		</ul>
	);
};

/*******************
 * Nft View Link
 *******************/

interface NftViewLinkProps {
	to: string;
}

const NftViewLink = ({ to }: NftViewLinkProps) => {
	return (
			<div className={styles.LinkContainer}>
			  <ArrowLink
			  className={styles.Link}
			  href={`/${zna}/nfts?view=true`}
			  replace
			>
			View Domain NFT
			</ArrowLink>
			</div>
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
