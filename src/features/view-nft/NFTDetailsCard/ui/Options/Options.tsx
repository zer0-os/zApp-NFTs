import { FC, useCallback, useState } from 'react';

import {
	useWeb3,
	useDomainData,
	useDomainMetadata,
} from '../../../../../lib/hooks';
import {
	generateDropdownOption,
	getDownloadOptions,
	DropdownOption,
	dropdownOptionConfig,
} from './helpers';
import {
	getDomainId,
	useDownloadAsset,
	useShareAsset,
} from '../../../../../lib/util';
import { NFT_ASSET_SHARE_KEYS } from '../../../../../lib/helpers';

import { IconDotsVertical, IconDownload2, IconShare7 } from '@zero-tech/zui';
import { DropdownMenu, Tooltip } from '@zero-tech/zui';

import styles from './Options.module.scss';

export type OptionsProps = {
	className?: string;
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

	const downloadOptions = getDownloadOptions(
		downloadAsset,
		metadata?.image,
		metadata?.image_2,
		metadata?.image_3,
		metadata?.animation_url,
	);

	const onShareAsset = () => {
		shareAsset(NFT_ASSET_SHARE_KEYS.TWITTER);
	};

	return (
		<div className={styles.Options}>
			<ShareButton onClick={onShareAsset} />
			<DownloadButton downloadOptions={downloadOptions} />
			{domain?.owner?.toLowerCase() === account?.toLowerCase() && (
				<MoreOptionsButton
					className={styles.Button}
					zna={zna}
					trigger={<IconDotsVertical className={styles.Icon} isFilled />}
				/>
			)}
		</div>
	);
};

/********************
 * Share Asset Button
 ********************/
const ShareButton = ({ onClick }) => (
	<Tooltip content="Share to Twitter">
		<button className={styles.Button} onClick={onClick}>
			<IconShare7 color={'#01F4CB'} isFilled />
		</button>
	</Tooltip>
);

/***********************
 * Download Asset Button
 ***********************/
const DownloadButton = ({ downloadOptions }) => (
	<DropdownMenu
		className={styles.Button}
		items={downloadOptions}
		side="bottom"
		alignMenu="end"
		trigger={
			<Tooltip content="Download for Twitter">
				<IconDownload2 color={'#01F4CB'} isFilled />
			</Tooltip>
		}
	/>
);

/*******************************
 * More Options Dropdown Button
 ******************************/
export const MoreOptionsButton = ({ zna, trigger, className }) => {
	const [option, setOption] = useState<DropdownOption | undefined>();

	const onSelectOption = useCallback((e) => {
		setOption(e.id);
	}, []);

	return (
		<>
			{dropdownOptionConfig.map(({ id, modalComponent: Modal }) => (
				<Modal
					key={id}
					zna={zna}
					open={option === id}
					onOpenChange={(open) => !open && setOption(undefined)}
					onClose={() => setOption(undefined)}
				/>
			))}

			<DropdownMenu
				className={className}
				items={dropdownOptionConfig.map(({ id, label, icon }) =>
					generateDropdownOption(id, label, icon, onSelectOption),
				)}
				side="bottom"
				alignMenu="end"
				trigger={trigger}
			/>
		</>
	);
};
