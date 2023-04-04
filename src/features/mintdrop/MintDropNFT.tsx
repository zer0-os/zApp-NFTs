// React Imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

// Component Imports
import MintDropNFTWizard from './MintDropNFTWizard';

// Library Imports
import { Stage, DropData, TransactionData } from './types';
import { getBannerLabel, getBannerButtonText } from './labels';
import {
	getDropData,
	getUserEligibility,
	getNumberPurchasedByUser,
	getBalanceEth,
	getMaxPurchasesPerUser,
} from './helpers';
import useAsyncEffect from 'use-async-effect';
import { useZsaleSdk, useWeb3 } from '../../lib/hooks';

//- Style Imports
import styles from './MintDropNFT.module.scss';
import { DropBanner } from '../../features/ui';
import { ROUTES, ROUTE_NAMES } from '../../lib/constants/routes';
import { Modal } from '@zero-tech/zui/components';
import { ethers } from 'ethers';
import { Status } from '../../lib/constants/status';

type MintDropNFTFlowContainerProps = {
	privateSaleEndTime: number;
};

export const MintDropNFT = ({
	privateSaleEndTime,
}: MintDropNFTFlowContainerProps) => {
	const PRIVATE_SALE_END_TIME = privateSaleEndTime;

	const history = useHistory();
	const location = useLocation();

	// Web3 hooks
	const { account, provider, chainId } = useWeb3();

	const { gensInstance: zSaleInstance } = useZsaleSdk();
	const { executeTransaction } = useTransaction();

	// Internal State
	const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
	const [canOpenWizard, setCanOpenWizard] = useState<boolean>(false);
	const [pricePerNFT, setPricePerNFT] = useState<number>(0);
	const [numMinted, setNumMinted] = useState<number>(0);
	const [countdownDate, setCountdownDate] = useState<number | undefined>();
	const [hasCountdownFinished, setHasCountdownFinished] =
		useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isInTransitionMode, setIsInTransitionMode] = useState<boolean>(false);

	// Auction data
	const [dropStage, setDropStage] = useState<Stage | undefined>();
	const [wheelsTotal, setWheelsTotal] = useState<number | undefined>();
	const [wheelsMinted, setWheelsMinted] = useState<number | undefined>();
	const [maxPurchasesPerUser, setMaxPurchasesPerUser] = useState<
		number | undefined
	>();
	const [failedToLoad, setFailedToLoad] = useState<boolean>(false);
	const [refetch, setRefetch] = useState<number>(0);

	// User data
	const [isUserWhitelisted, setIsUserWhitelisted] = useState<
		boolean | undefined
	>();
	const [balanceEth, setBalanceEth] = useState<number | undefined>();
	const [numberPurchasedByUser, setNumberPurchasedByUser] = useState<
		number | undefined
	>();
	const [status, setStatus] = useState<string>();

	// NOTE: TEMPORARY FOR SALE HALT
	const isSaleHalted = false;

	const transactionSuccessful = (numWheels: number) => {
		setNumMinted(numMinted + numWheels); // Increment to trigger re-fetch
		setNumberPurchasedByUser(numberPurchasedByUser! + numWheels);
	};

	// Open/close the Mint wizard
	const openWizard = (event: any) => {
		if (event.target.nodeName.toLowerCase() === 'a') {
			return;
		}
		if (isSaleHalted) {
			window?.open('https://discord.gg/7tyggH6eh9', '_blank')?.focus();
			return;
		}
		if (dropStage === Stage.Whitelist && !countdownDate) {
			window?.open(
				'https://zine.wilderworld.com/a-new-genesis-collection-is-born-introducing-wilder-gens/',
				'_blank',
			);
		}
		if (dropStage === Stage.Upcoming || !canOpenWizard || failedToLoad) {
			window?.open('https://discord.gg/mb9fcFey8a', '_blank')?.focus();
		} else if (dropStage === Stage.Sold || dropStage === Stage.Ended) {
			history.push('market/pals.gen');
		} else {
			setIsWizardOpen(true);
		}
	};

	const closeWizard = () => {
		setIsWizardOpen(false);
	};

	// Toggles to grid view when viewport
	// resizes to below 700px
	const handleResize = () => {
		setCanOpenWizard(window.innerWidth >= 320);
	};

	const countdownFinished = () => {
		// if (
		// 	Date.now() > PRIVATE_SALE_END_TIME &&
		// 	Date.now() < PUBLIC_SALE_START_TIME
		// ) {
		// 	setHasCountdownFinished(false);
		// 	setIsInTransitionMode(true);
		// 	setCountdownDate(PUBLIC_SALE_START_TIME);
		// } else {
		setHasCountdownFinished(true);
		// }
	};

	// Run a few things after the transaction succeeds
	// const transactionSuccessful = (numWheels: number) => {};

	// Submits transaction, feeds status updates
	// back through the callbacks provided by MintWheels
	// const onSubmitTransaction = async (data: TransactionData) => {
	// 	const { numWheels, statusCallback, errorCallback, finishedCallback } = data;
	// 	if (!isSaleHalted) {
	// 		const combinedFinishedCallback = () => {
	// 			transactionSuccessful(numWheels);
	// 			finishedCallback();
	// 		};
	// 		mintWheels(
	// 			numWheels,
	// 			statusCallback,
	// 			combinedFinishedCallback,
	// 			errorCallback,
	// 		);
	// 	} else {
	// 		errorCallback('Sale has ended');
	// 	}
	// };

	// Executes the confirm form transaction.
	const onSubmitTransaction = (data: TransactionData) => {
		const { numWheels, statusCallback, errorCallback, finishedCallback } = data;
		const combinedFinishedCallback = () => {
			transactionSuccessful(numWheels);
			finishedCallback();
		};
		// setErrorText(undefined);

		const sdkAction = zSaleInstance.purchaseDomains;

		return executeTransaction(
			sdkAction,
			[ethers.BigNumber.from(numWheels), provider.getSigner()],
			{
				onStart: () => {
					setStatus(Status.CONFIRM_WALLET);
				},
				onProcessing: () => {
					setStatus(Status.MINTING);
					statusCallback(status);
				},
				onSuccess: () => combinedFinishedCallback(),
				onError: (error: any) => errorCallback(error.message),

				invalidationKeys: [['user', { account, numWheels }]],
			},
		);
	};

	const openProfile = () => {
		setIsWizardOpen(false);

		const params = new URLSearchParams(location.search);
		params.set('profile', 'true');

		history.push({
			pathname:
				ROUTES[ROUTE_NAMES.PROFILE].slug +
				ROUTES[ROUTE_NAMES.OWNED_DOMAINS].slug,
			state: { previous: location.pathname },
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	/**
	 * This is the initial "get data"
	 */
	useEffect(() => {
		let isMounted = true;

		// Generally this would be < DATE_WHITELIST & < PUBLIC_SALE_START_TIME
		// but given time constraints we're just going to compare
		// to PUBLIC_SALE_START_TIME
		if (isSaleHalted) {
			// setCountdownDate(PUBLIC_SALE_START_TIME);
			setFailedToLoad(false);
			return;
		}

		const getData = async () => {
			if (!zSaleInstance) {
				return;
			}

			// Get the data related to the drop
			getDropData(zSaleInstance)
				.then((d) => {
					if (!isMounted) {
						return;
					}
					const primaryData = d as DropData;
					if (primaryData.dropStage === Stage.Upcoming) {
						setCountdownDate(undefined);
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
					} else if (primaryData.dropStage === Stage.Whitelist) {
						setCountdownDate(PRIVATE_SALE_END_TIME);
					} else {
						setCountdownDate(undefined);
					}
					if (refetch > 0) {
						setCountdownDate(undefined);
					}
					setDropStage(primaryData.dropStage);
					setWheelsTotal(primaryData.wheelsTotal);
					setWheelsMinted(primaryData.wheelsMinted);
					setFailedToLoad(false);
				})
				.catch((e) => {
					console.error(e);
					console.log('failed to get');
					setRefetch(refetch + 1);
					setFailedToLoad(true);
				});
		};
		getData();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [provider, zSaleInstance, isSaleHalted]);

	useEffect(() => {
		let isMounted = true;
		if (!zSaleInstance || isSaleHalted) {
			return;
		}
		// Get user data if wallet connected
		if (account && provider) {
			getUserEligibility(account, zSaleInstance).then((d) => {
				if (isMounted && d !== undefined) {
					setIsUserWhitelisted(d);
				}
			});
			getMaxPurchasesPerUser(zSaleInstance, account).then((d) => {
				if (isMounted && d !== undefined) {
					setMaxPurchasesPerUser(d);
				}
			});
		} else {
			setIsUserWhitelisted(undefined);
		}
		return () => {
			isMounted = false;
		};
	}, [account, provider, zSaleInstance, isSaleHalted, dropStage]);

	/**
	 * Get user-specific variables whenever mint amount or account changes
	 */
	useEffect(() => {
		let isMounted = true;
		if (!zSaleInstance || !provider || isSaleHalted) {
			return;
		}
		// Get user data if wallet connected
		if (account && provider) {
			getBalanceEth(provider.getSigner()).then((d) => {
				if (isMounted && d !== undefined) {
					setBalanceEth(d);
				}
			});

			getNumberPurchasedByUser(zSaleInstance, account).then((d) => {
				if (isMounted && d !== undefined) {
					setNumberPurchasedByUser(d);
				}
			});
		} else {
			setBalanceEth(undefined);
			setNumberPurchasedByUser(undefined);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numMinted, account, provider, zSaleInstance]);

	/**
	 * Gets and sets what stage the sale is in
	 */
	useEffect(() => {
		let isMounted = true;
		if (!zSaleInstance || isSaleHalted || !provider) {
			return;
		}

		getDropData(zSaleInstance)
			.then((d) => {
				if (!isMounted) {
					return;
				}
				const primaryData = d as DropData;

				if (dropStage !== undefined) {
					if (hasCountdownFinished && primaryData.dropStage === dropStage) {
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
						return;
					}
					if (primaryData.dropStage === Stage.Upcoming) {
						setCountdownDate(undefined);
						setTimeout(() => {
							setRefetch(refetch + 1);
						}, 7000);
					} else if (primaryData.dropStage === Stage.Whitelist) {
						setCountdownDate(PRIVATE_SALE_END_TIME);
					} else {
						setCountdownDate(undefined);
					}
					if (refetch > 0) {
						setCountdownDate(undefined);
					}
					setDropStage(primaryData.dropStage);
					setWheelsTotal(primaryData.wheelsTotal);
					setWheelsMinted(primaryData.wheelsMinted);
				}
				if (!isSaleHalted) {
					setFailedToLoad(false);
				}
			})
			.catch((e) => {
				if (!failedToLoad) {
					setTimeout(() => {
						setRefetch(refetch + 1);
					}, 7000);
				}
				setFailedToLoad(true);
			});

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasCountdownFinished, refetch, provider, zSaleInstance]);

	/**
	 * Listens for changes to drop stage, and handles UI accordingly
	 */
	useEffect(() => {
		let timer: any;
		if (
			zSaleInstance &&
			(dropStage === Stage.Public || dropStage === Stage.Whitelist) &&
			!isSaleHalted &&
			account &&
			provider
		) {
			// Fetch minted count periodically
			timer = setInterval(async () => {
				const sold = await zSaleInstance.getNumberOfDomainsSold();
				if (sold) {
					if (wheelsTotal !== undefined && sold >= wheelsTotal) {
						setDropStage(Stage.Sold);
					}
					setWheelsMinted(sold);
				}
			}, 5000);
		}

		return () => {
			timer && clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropStage, zSaleInstance, isSaleHalted, account, provider]);

	/**
	 * Gets sale price on SDK instance or library change
	 */
	useAsyncEffect(async () => {
		const price = await zSaleInstance.getSalePrice();
		setPricePerNFT(Number(price));
	}, [zSaleInstance, provider, dropStage]);

	const bannerLabel = () => {
		if (isSaleHalted) {
			return (
				<>
					<span>GENs sale has been temporarily paused.</span>
					<span style={{ display: 'block', marginTop: 4 }}>
						Join our{' '}
						<b>
							<a
								href={'https://discord.gg/7tyggH6eh9'}
								target={'_blank'}
								rel={'noreferrer'}
							>
								Discord
							</a>
						</b>{' '}
						for more details.
					</span>
				</>
			);
		}
		return failedToLoad
			? 'Failed to load sale data - refresh to try again'
			: getBannerLabel(
					dropStage,
					wheelsMinted,
					wheelsTotal,
					countdownDate,
					countdownFinished,
					hasCountdownFinished,
					isInTransitionMode,
			  );
	};

	const buttonText = () => {
		return failedToLoad ||
			isSaleHalted ||
			(dropStage === Stage.Whitelist && !countdownDate)
			? 'Learn More'
			: getBannerButtonText(dropStage, canOpenWizard);
	};

	const bannerTitle = () => {
		let title = 'GENs are Materializing…';
		switch (dropStage) {
			case Stage.Upcoming:
				title = 'GENs are Materializing…';
				break;
			case Stage.Whitelist:
				title = 'Unlock the Power of GENs';
				break;
			case Stage.Public:
				title = 'Unlock the Power of GENs';
				break;
			case Stage.Ended:
			case Stage.Sold:
				title = 'GENs Materialization Complete';
				break;
			default:
				title = 'GENs are Materializing…';
				break;
		}
		return title;
	};

	return (
		<>
			{canOpenWizard && isWizardOpen && !isSaleHalted && (
				<Modal open onOpenChange={(isOpen: boolean) => setIsWizardOpen(isOpen)}>
					<MintDropNFTWizard
						balanceEth={balanceEth}
						dropStage={dropStage}
						isUserWhitelisted={isUserWhitelisted}
						maxPurchasesPerUser={maxPurchasesPerUser}
						numberPurchasedByUser={numberPurchasedByUser}
						pricePerNFT={pricePerNFT}
						onClose={closeWizard}
						onFinish={openProfile}
						onSubmitTransaction={onSubmitTransaction}
						userId={account as string | undefined}
						wheelsMinted={wheelsMinted}
						wheelsTotal={wheelsTotal}
					/>
				</Modal>
			)}
			<div className={styles.BannerContainer}>
				<DropBanner
					title={bannerTitle()}
					label={bannerLabel()}
					buttonText={buttonText()}
					onClick={openWizard}
				/>
			</div>
		</>
	);
};