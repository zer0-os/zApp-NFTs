//- React Imports
import { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

//- Components Imports

//- Containers Imports

//- Types Imports
import { Stage } from '../mintdrop/types';

//- Constants Imports
import {
	PRIVATE_SALE_END_TIME,
	RAFFLE_END_TIME,
	RAFFLE_START_TIME,
	SALE_START_TIME,
} from './Drop.constants';

// Style Imports
import styles from './Raffle.module.scss';
import { DropBanner, Countdown } from '../../features/ui';
import { EXTERNAL_URL } from '../../lib/constants/uris';
import { Modal } from '@zero-tech/zui/components';
import { MintDropNFT } from '../../features/mintdrop';
import RegistrationContainer from './RaffleRegistration/RegistrationContainer';
import WaitlistContainer from './WaitlistRegistration/WaitlistContainer';

export const RaffleContainer = () => {	

	const currentTime = new Date().getTime();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [hasRaffleStarted, setHasRaffleStarted] = useState<boolean>(
		currentTime >= RAFFLE_START_TIME,
	);
	const [hasRaffleEnded, setHasRaffleEnded] = useState<boolean>(
		currentTime >= RAFFLE_END_TIME,
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [hasSaleStarted, setHasSaleStarted] = useState<boolean>(false);
	const [hasSaleCountDownEnded, setHasSaleCountDownEnded] =
		useState<boolean>(false);

	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
			navigator.userAgent,
		);
	const [windowWidth, setWindowWidth] = useState<number | undefined>();



	const closeModal = () => {
		setIsModalOpen(false);
	};

	const onFinishRaffleStartCountdown = () => {
		setHasRaffleStarted(true);
	};

	const onFinishRaffleEndCountdown = () => {
		setHasRaffleEnded(true);
	};

	const onFinishSaleStartCountdown = () => {
		setHasSaleCountDownEnded(true);
		// setHasSaleStarted(currentBlock >= SALE_START_BLOCK);
	};

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	const onBannerClick = () => {
		if (!hasRaffleEnded) {
			setIsModalOpen(true);
		} else {
			window.open(EXTERNAL_URL.DROP_ZINE, '_blank');
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useAsyncEffect(async () => {
		const interval = setInterval(async () => {
			setHasSaleStarted(Date.now() >= SALE_START_TIME);
			if (Date.now() >= SALE_START_TIME) {
				clearInterval(interval);
			}
		}, 13000);
		return () => clearInterval(interval);
	}, []);



	const bannerLabel = (): React.ReactNode => {
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

	const bannerButtonLabel = () => {
		if (!hasRaffleStarted) {
			return 'Get Notified';
		} else if (!hasRaffleEnded) {
			return 'Sign up for Mintlist';
		} else {
			return 'Learn More';
		}
	};

	const overlay = () => {
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

	////////////
	// Render //
	////////////

	if (!hasSaleCountDownEnded) {
		return (
			<>
				{isModalOpen && overlay()}
				<div className={styles.BannerContainer}>
					<DropBanner
						title={'GENs are Materializing…'}
						label={bannerLabel()}
						buttonText={bannerButtonLabel()}
						onClick={onBannerClick}
					/>
				</div>
			</>
		);
	}

	return <MintDropNFT privateSaleEndTime={PRIVATE_SALE_END_TIME} />;
};
