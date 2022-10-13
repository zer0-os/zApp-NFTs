import { Skeleton } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

export interface BannerProps {
	imageSrc: string;
	imageAlt: string;
	isNFTView: boolean;
}

export const Banner = ({ imageSrc, imageAlt, isNFTView }: BannerProps) => {
	const banner = imageSrc ? (
		<img src={imageSrc} alt={imageAlt + ' banner image'} />
	) : (
		<Skeleton width={'100%'} height={'100%'} />
	);

	const thumbnail = imageSrc ? (
		<img src={imageSrc} alt={imageAlt + ' thumbnail image'} />
	) : (
		<Skeleton width={'100%'} height={'100%'} circle />
	);

	return (
		<>
			<div
				className={cx(styles.Banner, {
					isNFTView: isNFTView,
				})}
			>
				{banner}
			</div>
			{!isNFTView && <div className={styles.Thumbnail}>{thumbnail}</div>}
		</>
	);
};
