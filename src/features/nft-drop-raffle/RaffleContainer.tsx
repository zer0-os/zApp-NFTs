import { useState } from 'react';

import { Banners, BannerSeries } from '../ui/BannerSeries/BannerSeries';

import styles from './Raffle.module.scss';
import { RaffleStage } from './raffle';

export const RaffleContainer = () => {
	const [stage] = useState<RaffleStage>(RaffleStage.STARTED);

	const banners: Banners[] = [
		{
			shouldRender: stage === RaffleStage.NOT_STARTED,
			bannerValues: {
				text: 'Raffle starting soon',
				subtext: 'Raffle entries will open shortly!',
			},
		},
		{
			shouldRender: stage === RaffleStage.STARTED,
			bannerValues: {
				text: 'Raffle has opened',
				subtext: 'Raffle closing shortly, get in quickly!',
				buttonText: 'Register',
				onClick: () => console.log('yeah'),
			},
		},
		{
			shouldRender: stage === RaffleStage.ENDED,
			bannerValues: {
				text: 'Raffle has closed',
				subtext: 'Sale will start at some point in the not so distant future!',
				buttonText: 'View Sale Info',
				onClick: () => console.log('yeah'),
			},
		},
	];

	/* need to start a timer if it's hidden, to show it when it should be rendered */
	if (stage === RaffleStage.HIDDEN) {
		return null;
	}

	return (
		<div className={styles.BannerContainer}>
			<BannerSeries banners={banners} />
		</div>
	);
};
