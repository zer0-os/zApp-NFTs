import { FC } from 'react';

import { getDomainId } from '../../../lib/util/domains/domains';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './Banner.module.scss';

export interface BannerProps {
	zna: string;
}

export const Banner: FC<BannerProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: metadata } = useDomainMetadata(domainId);

	const altTemplate = `${metadata?.title ?? zna} nft `;

	const thumbnailAlt = altTemplate + ` thumbnail`;
	const thumbnailSrc = metadata?.previewImage ?? metadata?.image;

	const bannerAlt = altTemplate + ` banner`;
	const bannerSrc = metadata?.image_full ?? metadata?.image;

	return (
		<div className={styles.Container}>
			<div className={styles.Banner}>
				<IpfsMedia
					alt={bannerAlt}
					className={styles.Media}
					src={bannerSrc}
					options={{ size: 'large', fit: 'fill' }}
				/>
				<div className={styles.Thumbnail}>
					<Thumbnail alt={thumbnailAlt} src={thumbnailSrc} />
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
