import { FC } from 'react';

import { getDomainId } from '../../../lib/util/domains/domains';
import { useColorPallette } from '../../../lib/hooks/useColorPallette';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTBannerContainer.module.scss';

export interface BannerProps {
	zna: string;
}

export const NFTBannerContainer: FC<BannerProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: metadata } = useDomainMetadata(domainId);

	const altTemplate = `${metadata?.title ?? zna} nft `;

	const bannerAlt = altTemplate + ` banner`;
	const bannerSrc = metadata?.image_full ?? metadata?.image;

	const { data: prominentColor } = useColorPallette(bannerSrc);

	const bannerBackground = {
		background: Boolean(prominentColor?.length)
			? `radial-gradient(rgba(${prominentColor[0].toLocaleString()}, 0.4) 0%, rgba(243, 16, 15, 0) 100%)`
			: 'unset',
	};

	return (
		<div className={styles.Banner} style={bannerBackground}>
			<IpfsMedia
				alt={bannerAlt}
				className={styles.Media}
				src={bannerSrc}
				options={{ size: 'full', fit: 'fit' }}
			/>
		</div>
	);
};
