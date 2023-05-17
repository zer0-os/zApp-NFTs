import React, { useCallback, useState, useMemo } from 'react';

import { Banners, BannerSeries } from '../../../ui/BannerSeries/BannerSeries';

import { DropModal } from '../DropModal';
import { useDrop } from '../../lib/useDrop';
import { CURRENT_SALE, PLURAL_NAME, SALE_NAME } from '../../lib/drop-data';

import styles from './DropBanners.module.scss';

export const DropBanners = () => {
	const { modal, handleToggleModal } = useMintDropNFTModal();

	const { data, isLoading } = useDrop(CURRENT_SALE);

	const isStarted = data?.started;
	const isPaused = data?.paused;
	const remaining = data?.amountForSale - data?.amountSold;

	const banners: Banners[] = useMemo(() => {
		return [
			{
				shouldRender: isLoading,
				bannerValues: {
					text: SALE_NAME,
					subtext: 'Loading sale data...',
				},
			},
			{
				shouldRender: isPaused,
				bannerValues: {
					text: SALE_NAME + ' minting is temporarily paused',
				},
			},
			{
				shouldRender: !isStarted,
				bannerValues: {
					text: SALE_NAME,
					subtext: 'Minting will open soon!',
				},
			},
			{
				shouldRender: data?.amountForSale - data?.amountSold === 0,
				bannerValues: {
					text: PLURAL_NAME + ' are sold out',
					subtext: <>{data?.amountSold} have been minted</>,
				},
			},
			{
				shouldRender: true,
				bannerValues: {
					text: SALE_NAME + ' sale underway',
					subtext: (
						<>
							There are <b>{remaining}</b> GENs remaining
						</>
					),
					onClick: handleToggleModal,
				},
			},
		];
	}, [isLoading, isPaused, isStarted, handleToggleModal]);

	return (
		<div className={styles.BannerContainer}>
			{modal}
			<BannerSeries banners={banners} />
		</div>
	);
};

/////////////////////////
// useMintDropNFTModal //
/////////////////////////

const useMintDropNFTModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleModal = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen, setIsModalOpen]);

	const modal = useMemo(() => {
		if (isModalOpen) {
			return <DropModal onClose={() => setIsModalOpen(false)} />;
		} else {
			return;
		}
	}, [isModalOpen]);

	return {
		modal,
		handleToggleModal,
	};
};
