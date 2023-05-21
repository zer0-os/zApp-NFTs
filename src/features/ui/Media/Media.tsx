import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './Media.module.scss';

interface MediaProps {
	alt: string;
	src: string;
	variant?: 'image' | 'video';
}

export const Media = ({ alt, src, variant }: MediaProps) => {
	return (
		<div className={styles.Media} data-variant={variant}>
			<IpfsMedia className={styles.Image} alt={alt} src={src} />
		</div>
	);
};
