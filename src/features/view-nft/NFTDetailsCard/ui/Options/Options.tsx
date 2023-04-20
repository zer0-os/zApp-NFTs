import { FC } from 'react';

import { MoreNFTOptions } from '../../../../ui/MoreNFTOptions';
import { Tooltip } from '@zero-tech/zui/components';
import {
	IconDotsVertical,
	IconDownload2,
	IconShare7,
} from '@zero-tech/zui/components/Icons';

import styles from './Options.module.scss';
import classNames from 'classnames';

export type OptionsProps = {
	className?: string;
	zna: string;
};

/**
 * Wraps NFT action options in tray container within domain preview i.e share, download, more options.
 */
export const Options: FC<OptionsProps> = ({ className, zna }) => {
	return (
		<div className={classNames(styles.Container, className)}>
			{/* TODO: wire up share to twitter */}
			<Tooltip content="Share to Twitter">
				<button onClick={() => console.log('Share')}>
					<IconShare7 color={'#52CBFF'} isFilled />
				</button>
			</Tooltip>

			{/* TODO: wire up download for twitter */}
			<Tooltip content="Download for Twitter">
				<button onClick={() => console.log('Download')}>
					<IconDownload2 color={'#52CBFF'} isFilled />
				</button>
			</Tooltip>

			<MoreNFTOptions
				zna={zna}
				trigger={<IconDotsVertical className={styles.Icon} isFilled />}
			/>
		</div>
	);
};
