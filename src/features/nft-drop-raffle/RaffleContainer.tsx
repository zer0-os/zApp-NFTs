import { useState } from 'react';

import {
	RAFFLE_END_TIME,
	RAFFLE_START_TIME,
	SALE_START_TIME,
} from './Drop.constants';

import { Modal } from '@zero-tech/zui/components';
import { Countdown } from '../ui';
import { Banners, BannerSeries } from '../ui/BannerSeries/BannerSeries';
import RegistrationContainer from './RaffleRegistration/RegistrationContainer';
import WaitlistContainer from './WaitlistRegistration/WaitlistContainer';

import styles from './Raffle.module.scss';

const current = new Date().getTime();
const step = 5000;

const RAFFLE_TIMES = {
	show: current + step,
	start: current + 2 * step,
	end: current + 3 * step,
	hide: current + 4 * step,
};

enum RaffleStage {
	HIDDEN,
	NOT_STARTED,
	STARTED,
	ENDED,
	FINISHED,
}

const STAGE_TIMES = {
	[RaffleStage.NOT_STARTED]: RAFFLE_TIMES.show,
	[RaffleStage.STARTED]: RAFFLE_TIMES.start,
	[RaffleStage.ENDED]: RAFFLE_TIMES.end,
};

export const RaffleContainer = () => {
	const [stage, setStage] = useState<RaffleStage>(RaffleStage.STARTED);

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

	// calculate initial stage

	// const currentTime = new Date().getTime();
	//
	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	//
	// const [hasRaffleStarted, setHasRaffleStarted] = useState<boolean>(
	// 	currentTime >= RAFFLE_START_TIME,
	// );
	// const [hasRaffleEnded, setHasRaffleEnded] = useState<boolean>(
	// 	currentTime >= RAFFLE_END_TIME,
	// );
	// // eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [hasSaleStarted, setHasSaleStarted] = useState<boolean>(false);
	// const [hasSaleCountDownEnded, setHasSaleCountDownEnded] =
	// 	useState<boolean>(false);
	//
	// const isMobile =
	// 	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
	// 		navigator.userAgent,
	// 	);
	// const [windowWidth, setWindowWidth] = useState<number | undefined>();
	//
	// const onFinishRaffleStartCountdown = () => {
	// 	setHasRaffleStarted(true);
	// };
	//
	// const onFinishRaffleEndCountdown = () => {
	// 	setHasRaffleEnded(true);
	// };
	//
	// const onFinishSaleStartCountdown = () => {
	// 	setHasSaleCountDownEnded(true);
	// 	// setHasSaleStarted(currentBlock >= SALE_START_BLOCK);
	// };
	//
	// const handleResize = () => {
	// 	setWindowWidth(window.innerWidth);
	// };
	//
	// const onBannerClick = () => {
	// 	if (!hasRaffleEnded) {
	// 		setIsModalOpen(true);
	// 	} else {
	// 		window.open(EXTERNAL_URL.DROP_ZINE, '_blank');
	// 	}
	// };
	//
	// useEffect(() => {
	// 	window.addEventListener('resize', handleResize);
	// 	handleResize();
	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, []);
	//
	// useAsyncEffect(async () => {
	// 	const interval = setInterval(async () => {
	// 		setHasSaleStarted(Date.now() >= SALE_START_TIME);
	// 		if (Date.now() >= SALE_START_TIME) {
	// 			clearInterval(interval);
	// 		}
	// 	}, 13000);
	// 	return () => clearInterval(interval);
	// }, []);
	//
	// ////////////
	// // Render //
	// ////////////
	//
	// if (!hasSaleCountDownEnded) {
	// 	return (
	// 		<>
	// 			{isModalOpen && (
	// 				<Overlay
	// 					isMobile={isMobile}
	// 					hasRaffleStarted={hasRaffleStarted}
	// 					setIsModalOpen={setIsModalOpen}
	// 					windowWidth={windowWidth}
	// 					hasRaffleEnded={hasRaffleEnded}
	// 					closeModal={() => setIsModalOpen(false)}
	// 				/>
	// 			)}
	// 			<div className={styles.BannerContainer}>
	// 				<Banner
	// 					text={'GENs are Materializing…'}
	// 					subtext={
	// 						<Label
	// 							hasRaffleEnded={hasRaffleEnded}
	// 							hasRaffleStarted={hasRaffleStarted}
	// 							onFinishRaffleEndCountdown={onFinishRaffleEndCountdown}
	// 							onFinishRaffleStartCountdown={onFinishRaffleStartCountdown}
	// 							onFinishSaleStartCountdown={onFinishSaleStartCountdown}
	// 						/>
	// 					}
	// 					buttonText={getButtonLabel(hasRaffleStarted, hasRaffleEnded)}
	// 					onClick={onBannerClick}
	// 				/>
	// 			</div>
	// 		</>
	// 	);
	// }
	//
	// return <MintDropNFT privateSaleEndTime={PRIVATE_SALE_END_TIME} />;
};

/////////////
// Overlay //
/////////////

interface OverlayProps {
	isMobile: boolean;
	hasRaffleStarted: boolean;
	setIsModalOpen: any;
	windowWidth: number;
	hasRaffleEnded: boolean;
	closeModal: any;
}

const Overlay = ({
	isMobile,
	hasRaffleStarted,
	setIsModalOpen,
	windowWidth,
	hasRaffleEnded,
	closeModal,
}: OverlayProps) => {
	if (isMobile && hasRaffleStarted) {
		return (
			<Modal open onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}>
				<p style={{ padding: 16, textAlign: 'center' }}>
					<b>Please use a desktop device to register</b>
				</p>
			</Modal>
		);
	}
	if (hasRaffleStarted && windowWidth && windowWidth < 900) {
		return (
			<Modal open onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}>
				<p style={{ padding: 16, textAlign: 'center' }}>
					<b>Please use a device with a larger viewport to register</b>
				</p>
			</Modal>
		);
	}
	if (!hasRaffleStarted) {
		return (
			<Modal open onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}>
				<WaitlistContainer />
			</Modal>
		);
	} else if (!hasRaffleEnded) {
		return (
			<Modal open onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}>
				<RegistrationContainer closeOverlay={closeModal} />
			</Modal>
		);
	}
};

//
// Label //
//

interface LabelProps {
	hasRaffleStarted: boolean;
	hasRaffleEnded: boolean;
	onFinishSaleStartCountdown: any;
	onFinishRaffleEndCountdown: any;
	onFinishRaffleStartCountdown: any;
}

const Label = ({
	hasRaffleStarted,
	hasRaffleEnded,
	onFinishSaleStartCountdown,
	onFinishRaffleEndCountdown,
	onFinishRaffleStartCountdown,
}: LabelProps) => {
	if (hasRaffleEnded) {
		return (
			<>
				Trinity Keeper claim begins in{' '}
				<b>
					<Countdown
						to={SALE_START_TIME}
						onFinish={onFinishSaleStartCountdown}
					/>
				</b>
			</>
		);
	} else if (hasRaffleStarted) {
		return (
			<>
				AIR WILD Season Two Mintlist Signup Period Ending in{' '}
				<b>
					<Countdown
						to={RAFFLE_END_TIME}
						onFinish={onFinishRaffleEndCountdown}
					/>
				</b>
			</>
		);
	} else {
		return (
			<>
				Get notified about the AIR WILD Season Two raffle - starting in{' '}
				<b>
					<Countdown
						to={RAFFLE_START_TIME}
						onFinish={onFinishRaffleStartCountdown}
					/>
				</b>
			</>
		);
	}
};

///////////////////////
// Utility Functions //
///////////////////////

const getButtonLabel = (hasRaffleStarted: boolean, hasRaffleEnded: boolean) => {
	if (!hasRaffleStarted) {
		return 'Get Notified';
	} else if (!hasRaffleEnded) {
		return 'Sign up for Mintlist';
	} else {
		return 'Learn More';
	}
};
