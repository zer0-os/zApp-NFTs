import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { IconDots, IconDownload, IconShare } from './Icons';
import { MoreNFTOptions } from '../../ui/MoreNFTOptions';
import { Tooltip } from '@zero-tech/zui/components';

import styles from './Options.module.scss';

export type OptionsProps = {
	domainId: string;
};

/**
 * Wraps NFT action options in tray container within domain preview i.e share, download, more options.
 */
export const Options: FC<OptionsProps> = ({ domainId }) => {
	const { account } = useWeb3();
	const { domain, isNFTView } = useDataContainer(domainId);

	return (
		<div className={styles.Container}>
			{/* TODO: wire up share to twitter */}
			<Tooltip content="Share to Twitter">
				<button onClick={() => console.log('Share')}>
					<IconShare />
				</button>
			</Tooltip>

			{/* TODO: wire up download for twitter */}
			<Tooltip content="Download for Twitter">
				<button onClick={() => console.log('Download')}>
					<IconDownload />
				</button>
			</Tooltip>

			{isNFTView && domain?.owner === account && (
				<MoreNFTOptions domainId={domainId} trigger={<IconDots />} />
			)}
		</div>
	);
};
