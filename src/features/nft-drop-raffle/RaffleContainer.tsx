import { useCallback, useMemo, useState } from 'react';

import { RaffleStage } from './lib/raffle';

import { Banners, BannerSeries } from '../ui/BannerSeries/BannerSeries';
import { WaitlistContainer, RegistrationContainer } from './components';

import styles from './Raffle.module.scss';

//////////////////////
// Raffle Container //
//////////////////////

export const RaffleContainer = () => {
	// @todo: undo hardcoding
	const [stage] = useState<RaffleStage>(RaffleStage.STARTED);
	const { modal, handleToggleModal } = useRaffleModal({ raffleStage: stage });

	const banners: Banners[] = useMemo(
		() => [
			{
				shouldRender: stage === RaffleStage.NOT_STARTED,
				bannerValues: {
					text: 'Raffle starting soon',
					subtext: 'Raffle entries will open shortly!',
					onClick: handleToggleModal,
				},
			},
			{
				shouldRender: stage === RaffleStage.STARTED,
				bannerValues: {
					text: 'Raffle has opened',
					subtext: 'Raffle closing shortly, get in quickly!',
					buttonText: 'Register',
					onClick: handleToggleModal,
				},
			},
			{
				shouldRender: stage === RaffleStage.ENDED,
				bannerValues: {
					text: 'Raffle has closed',
					subtext:
						'Sale will start at some point in the not so distant future!',
					buttonText: 'View Sale Info',
				},
			},
		],
		[stage, handleToggleModal],
	);

	/* need to start a timer if it's hidden, to show it when it should be rendered */
	if (stage === RaffleStage.HIDDEN) {
		return null;
	}

	return (
		<div className={styles.BannerContainer}>
			{modal}
			<BannerSeries banners={banners} />
		</div>
	);
};

////////////////////
// useRaffleModal //
////////////////////

enum RaffleModal {
	Raffle,
	Waitlist,
}

interface UseRaffleModalParams {
	raffleStage: RaffleStage;
}

const useRaffleModal = ({ raffleStage }: UseRaffleModalParams) => {
	const [currentModal, setCurrentModal] = useState<RaffleModal | undefined>();

	const handleToggleModal = useCallback(() => {
		if (raffleStage === RaffleStage.STARTED) {
			setCurrentModal(RaffleModal.Raffle);
		} else if (raffleStage === RaffleStage.NOT_STARTED) {
			setCurrentModal(RaffleModal.Waitlist);
		}
	}, [raffleStage]);

	const modal = useMemo(() => {
		if (currentModal === undefined) {
			return;
		}
		const close = () => setCurrentModal(undefined);

		if (currentModal === RaffleModal.Raffle) {
			return <RegistrationContainer closeOverlay={close} />;
		}
		if (currentModal === RaffleModal.Waitlist) {
			return <WaitlistContainer onClose={close} />;
		}
	}, [currentModal]);

	return {
		modal,
		handleToggleModal,
	};
};
