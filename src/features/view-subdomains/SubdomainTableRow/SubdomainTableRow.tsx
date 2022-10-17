import { FC } from 'react';

import { useSubdomainData } from '../useSubdomainData';
import { formatEthers } from '../../../lib/util/number/number';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { SkeletonText } from '@zero-tech/zui/components/SkeletonText';
import { TableData } from '@zero-tech/zui/components/AsyncTable/Column';

import styles from './SubdomainTableRow.module.scss';

type SubdomainTableRowProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onRowClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onRowClick,
}) => {
	const {
		metrics,
		buyNowPrice,
		metadata,
		isMetadataLoading,
		isButtonDisabled,
		isBuyNowPriceLoading,
		isMetricsLoading,
		imageAlt,
		imageSrc,
		paymentTokenLabel,
	} = useSubdomainData({
		id: domainId,
		zna: domainName,
		metadataUri: domainMetadataUri,
	});

	const volumeLabel = metrics?.volume?.all
		? formatEthers(metrics.volume.all) + paymentTokenLabel
		: undefined;

	return (
		<tr onClick={(e) => onRowClick(e, domainName)} className={styles.Container}>
			<TableData alignment={'left'}>
				<SkeletonText
					asyncText={{ text: metadata?.title, isLoading: isMetadataLoading }}
				/>
				<div>0://{domainName}</div>
			</TableData>
			<TableData alignment={'right'} className={styles.Metrics}>
				<SkeletonText
					asyncText={{
						text: volumeLabel,
						isLoading: isMetricsLoading,
					}}
				/>
			</TableData>

			<TableData alignment={'right'} className={styles.Button}>
				{buyNowPrice ? <BuyNowButton /> : <PlaceBidButton isRoot />}
			</TableData>
		</tr>
	);
};
