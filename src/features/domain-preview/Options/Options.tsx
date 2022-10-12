import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { IconDots } from './Icons';
import { MoreNFTOptions } from '../../ui/MoreNFTOptions';

import styles from './Options.module.scss';

type OptionsProps = {
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
			{/* TODO: share to twitter option */}
			{/* TODO:  download for twitter option */}

			{isNFTView && domain?.owner === account && (
				<MoreNFTOptions domainId={domainId} trigger={<IconDots />} />
			)}
		</div>
	);
};
