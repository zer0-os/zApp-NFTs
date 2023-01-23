import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './Media.module.scss';

interface MediaProps {
	alt: string;
	src: string;
}

export const Media = ({ alt, src }: MediaProps) => {
	return (
		<div className={styles.Media}>
			<IpfsMedia className={styles.Image} alt={alt} src={src} />
		</div>
	);
};
