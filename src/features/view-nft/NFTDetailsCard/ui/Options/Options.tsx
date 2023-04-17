import { FC } from 'react';

import {
	useWeb3,
	useDomainData,
	useDownloadAsset,
	useShareAsset,
	useDomainMetadata,
} from '../../../../../lib/hooks';
import { getDomainId } from '../../../../../lib/util';
import { NFT_ASSET_SHARE_KEYS } from '../../../../../lib/helpers';

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
	const { shareAsset } = useShareAsset(zna);
	const { downloadAsset } = useDownloadAsset();
	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);

	const onShareAsset = () => {
		shareAsset(NFT_ASSET_SHARE_KEYS.TWITTER);
	};

	console.log(metadata?.animation_url);

	const onDownloadAsset = () => {
		downloadAsset(metadata?.animation_url);
	};

	return (
		<div className={styles.Options}>
			<Tooltip content="Share to Twitter">
				<button className={styles.Button} onClick={onShareAsset}>
					<IconShare7 color={'#52CBFF'} isFilled />
				</button>
			</Tooltip>

			<Tooltip content="Download for Twitter">
				<button className={styles.Button} onClick={onDownloadAsset}>
					<IconDownload2 color={'#52CBFF'} isFilled />
				</button>
			</Tooltip>

			{domain?.owner?.toLowerCase() === account?.toLowerCase() && (
				<MoreNFTOptions
					zna={zna}
					trigger={<IconDotsVertical className={styles.Icon} isFilled />}
				/>
			)}
		</div>
	);
};
