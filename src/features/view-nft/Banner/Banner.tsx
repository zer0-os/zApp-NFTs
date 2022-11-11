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

	const bannerAlt = altTemplate + ` banner`;
	const bannerSrc = metadata?.image_full ?? metadata?.image;

	return (
		<div className={styles.Container}>
			<div className={styles.Background} />

			<div className={styles.Banner}>
				<IpfsMedia
					alt={bannerAlt}
					className={styles.Media}
					src={bannerSrc}
					options={{ size: 'full', fit: 'fit' }}
				/>
			</div>
		</div>
	);
};
