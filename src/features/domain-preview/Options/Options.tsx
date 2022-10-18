import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { MoreNFTOptions } from '../../ui/MoreNFTOptions';
import { Tooltip } from '@zero-tech/zui/components';
import {
	IconDotsVertical,
	IconDownload2,
	IconShare7,
} from '@zero-tech/zui/components/Icons';

import styles from './Options.module.scss';

export type OptionsProps = {
	domainId: string;
};

/**
 * Wraps NFT action options in tray container within domain preview i.e share, download, more options.
 */
export const Options: FC<OptionsProps> = ({ domainId }) => {
	const { account } = useWeb3();
	const { domain, domainMetadata, isNFTView } = useDataContainer(domainId);

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

			{isNFTView && domain?.owner !== account && (
				<MoreNFTOptions
					domainId={domainId}
					domainName={domain?.name}
					domainTitle={domainMetadata?.title}
					domainOwner={domain?.owner}
					domainCreator={domain?.minter}
					trigger={<IconDotsVertical color={'#52CBFF'} isFilled />}
				/>
			)}
		</div>
	);
};
