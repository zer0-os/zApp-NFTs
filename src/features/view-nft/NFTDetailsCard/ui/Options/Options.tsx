import { FC } from 'react';

import { getDomainId } from '../../../../../lib/util';
import { useWeb3 } from '../../../../../lib/hooks/useWeb3';
import { useDomainData } from '../../../../../lib/hooks/useDomainData';

import { MoreNFTOptions } from '../../../../ui/MoreNFTOptions';
import { Tooltip } from '@zero-tech/zui/components';
import {
	IconDotsVertical,
	IconDownload2,
	IconShare7,
} from '@zero-tech/zui/components/Icons';

import styles from './Options.module.scss';

export type OptionsProps = {
	zna: string;
};

/**
 * Wraps NFT action options in tray container within domain preview i.e share, download, more options.
 */
export const Options: FC<OptionsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { account } = useWeb3();
	const { data: domain } = useDomainData(domainId);

	console.log('AC', account);
	console.log('OW', domain?.owner);

	return (
		<div className={styles.Container}>
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

			{domain?.owner.toLowerCase() === account.toLowerCase() && (
				<MoreNFTOptions
					zna={zna}
					trigger={<IconDotsVertical className={styles.Icon} isFilled />}
				/>
			)}
		</div>
	);
};
