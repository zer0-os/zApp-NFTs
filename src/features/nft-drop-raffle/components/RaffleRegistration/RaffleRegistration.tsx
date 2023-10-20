import React, { useState } from 'react';
import { Button, Input, Wizard } from '@zero-tech/zui/components';

import styles from './RaffleRegistration.module.scss';
import { Spinner } from '@zero-tech/zui/components/LoadingIndicator/Spinner';

import iconDiscord from '../../../assets/discord.png';
import iconTwitter from '../../../assets/twitter.png';
import { ethers } from 'ethers';
import { ConnectWallet } from '../../../ui';
import {
	formatNumber,
	formatByDecimalPlace,
	ethTokenPrice,
} from '../../../../lib/util';
import { useCurrency } from '../../../../lib/hooks/useCurrency';

export interface RaffleRegistrationProps {
	isWalletConnected: boolean;
	account: string | undefined;
	drop: string | undefined;
	onSubmit: (statusCallback: (status: string) => void) => Promise<void>;
	onSubmitEmail: (email: string) => Promise<boolean>;
	closeOverlay: () => void;
}

export enum Steps {
	AboutRaffle,
	WalletAddress,
	CurrentBalances,
	PersonalInfo,
	FollowSocial,
}

export const RaffleRegistration = (props: RaffleRegistrationProps) => {
	const { data: wildPriceUsd } = useCurrency('wilder-world');

	// Raffle entry
	const [status, setStatus] = useState<string | undefined>();
	const [registrationError, setRegistrationError] = useState<
		string | undefined
	>();
	const [isLoadingRegistration, setIsLoadingRegistration] =
		useState<boolean>(false);

	// Email submission
	// const [isLoadingEmail, setIsLoadingEmail] = useState<boolean>(false);
	const [userEmail, setUserEmail] = useState<string | undefined>();
	const [emailError, setEmailError] = useState<string | undefined>();
	// const [emailRegistrationSuccess, setEmailRegistrationSuccess] =
	// 	useState<boolean>(false);

	const [firstName, setFirstName] = useState<string | undefined>();
	const [lastName, setLastName] = useState<string | undefined>();
	const [twitter, setTwitter] = useState<string | undefined>();
	const [discord, setDiscord] = useState<string | undefined>();
	const [telegram, setTelegram] = useState<string | undefined>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [balances, setBalances] = useState<any | undefined>();
	const [ethPriceUsd, SetEthPriceUsd] = useState<number>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const validationCriteria: any = {
		eth: '0',
		wild: '0',
		nft: 1,
		genesisNft: 1,
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [hasSufficientBalance, setHasSufficientBalance] = useState<any>({
		eth: true,
		wild: true,
		nft: true,
		genesisNft: true,
	});

	const [step, setStep] = useState<Steps>(Steps.AboutRaffle);

	const onSubmitEmail = async () => {
		// const valid = isValidEmail(userEmail || '');
		const valid = true;
		if (!valid) {
			setEmailError('Please enter a valid email address');
		} else {
			setIsLoadingRegistration(true);
			updateStatus(
				'Please sign transaction in your wallet to be entered in the nft-drop-raffle...',
			);
			setEmailError(undefined);
			// setIsLoadingEmail(true);
			try {
				await props.onSubmit({
					...balances,
					email: userEmail,
					firstName,
					lastName,
					twitter,
					discord,
					telegram,
				});

				// TODO: Disable adding email to mailchimp mail list
				// const successful = await props.onSubmitEmail(userEmail!);
				// if (!successful) {
				// 	setEmailError('Failed to register to mailing list');
				// } else {
				// 	setStep(Steps.FollowSocial);
				// 	setIsLoadingRegistration(false);
				// 	// setEmailRegistrationSuccess(true);
				// }
				// setIsLoadingEmail(false);
				setStep(Steps.FollowSocial);
				setIsLoadingRegistration(false);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				// @todo handle API errors here
				setEmailError(e?.message || 'Failed to register to mailing list');
				console.error('API call failed');
				setIsLoadingRegistration(false);
				// setIsLoadingEmail(false);
			}
		}
	};

	const checkBalanceEligibility = async () => {
		setIsLoadingRegistration(true);

		updateStatus('Checking your balance for eligibility');
		const ethPrice = await ethTokenPrice();
		SetEthPriceUsd(ethPrice);

		try {
			const response = await fetch(
				`https://zns-raffle-microservice.herokuapp.com/balances/${props.account}/${props.drop}`,
				// `https://raffle-entry-microservice.herokuapp.com/balances/0x9d79cD0605346f0Fa649D0EEE1DdB3c360aeb038/${props.drop}`,
				{
					method: 'GET',
				},
			);

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}
			setHasSufficientBalance({
				eth: ethers.utils
					.parseEther(data.ethBalance)
					.gte(ethers.utils.parseEther(validationCriteria.eth)),
				wild: ethers.utils
					.parseEther(data.wildBalance)
					.gte(ethers.utils.parseEther(validationCriteria.wild)),
				nft: data.nftsCount >= validationCriteria.nft,
				genesisNft: data.nftFromGenesis >= validationCriteria.genesisNft,
			});
			setBalances(data);
			// NOTE: Skip CurrentBalances step entirely and navigate to PersonalInfo Step
			setStep(Steps.CurrentBalances);

			// setStep(Steps.PersonalInfo);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setRegistrationError(err?.message || 'Failed to fetch wallet details');
			console.error(err);
		} finally {
			setIsLoadingRegistration(false);
		}
	};

	const onInputChange = (email: string) => {
		setUserEmail(email);
	};

	const updateStatus = (status: string) => {
		setStatus(status);
	};

	const onSubmitWalletAddress = async () => {};

	const aboutRaffle = () => {
		return (
			<>
				<p>
					Mintlisted members will have early access to the upcoming GENs drop.
					Sign up to the raffle with your wallet for a chance at joining the
					mintlist! <br />
					<br />
					{/* The minimum requirement is your wallet address, but if you would like
					us to be able to communicate directly with you, and increase your
					chance of securing a spot, you can provide us with more detail. */}
				</p>
				{registrationError && (
					<span className={styles.Error}>{registrationError}</span>
				)}
				{props.isWalletConnected && (
					<Button className={styles.Button} onPress={checkBalanceEligibility}>
						Continue
					</Button>
				)}
				{!props.isWalletConnected && (
					<ConnectWallet message={'Connect your wallet to enter Raffle.'}>
						Connect Wallet
					</ConnectWallet>
				)}
			</>
		);
	};

	const walletAddress = () => {
		return (
			<>
				<p>Start by entering your ETH wallet address</p>
				<div className={styles.Email}>
					<Input
						className={styles.Input}
						onChange={onInputChange}
						isReadOnly={true}
						placeholder={'ETH Address'}
						value={props?.account}
					/>
				</div>
				<Button className={styles.Button} onPress={onSubmitWalletAddress}>
					Continue
				</Button>
			</>
		);
	};

	const getValidationError = () => {
		const messages = [];
		for (const key in validationCriteria) {
			if (!hasSufficientBalance[key]) {
				messages.push(
					validationCriteria[key] +
						' ' +
						(key === 'genesisNft' ? 'GENESIS NFT' : key.toUpperCase()) +
						((key === 'nft' || key === 'genesisNft') &&
						validationCriteria[key] > 1
							? 's'
							: ''),
				);
			}
		}
		if (messages.length > 1) {
			const last = messages.pop();
			return messages.join(', ') + ' and ' + last;
		} else {
			return messages.join(', ');
		}
	};

	const currentBalances = () => {
		return (
			<>
				<p>Your current balances</p>
				<div className={styles.Balances}>
					<div className={styles.eachBalances}>
						<div>WILD</div>
						<div
							className={`${
								!hasSufficientBalance.wild ? styles.ErrorColor : ''
							} ${styles.amount}`}
						>
							{formatByDecimalPlace(balances?.wildBalance || 0, 2)}
						</div>
						<div>
							{'$' +
								formatNumber(wildPriceUsd * Number(balances?.wildBalance || 0))}
						</div>
					</div>

					<div className={styles.eachBalances}>
						<div> ETH</div>
						<div
							className={`${
								!hasSufficientBalance.eth ? styles.ErrorColor : ''
							} ${styles.amount}`}
						>
							{formatByDecimalPlace(balances?.ethBalance || 0, 2)}
						</div>
						<div>
							{'$' +
								formatNumber(
									(ethPriceUsd || 2400) * Number(balances?.ethBalance || 0),
								)}
						</div>
					</div>
					<div className={styles.eachBalances}>
						<div>Wilder NFT</div>
						<div
							className={`${
								!hasSufficientBalance.nft ? styles.ErrorColor : ''
							} ${styles.amount}`}
						>
							{balances?.nftsCount || 0}
						</div>
						{/* <div>$456.00</div> */}
					</div>
					<div className={styles.eachBalances}>
						<div>Genesis NFT</div>
						<div
							className={`${
								!hasSufficientBalance.genesisNft ? styles.ErrorColor : ''
							} ${styles.amount}`}
						>
							{balances?.nftFromGenesis || 0}
						</div>
						{/* <div>$456.00</div> */}
					</div>
				</div>

				{hasSufficientBalance.eth &&
				hasSufficientBalance.wild &&
				hasSufficientBalance.nft &&
				hasSufficientBalance.genesisNft ? (
					<p className={styles.Success}>
						Your balances meet the requirements for entry!
					</p>
				) : (
					<p className={`${styles.Error} ${styles.marginTop40}`}>
						You need at least <strong>{getValidationError()}</strong> to meet
						the requirements for entry
					</p>
				)}
				<Button
					className={styles.Button}
					isDisabled={
						!(
							hasSufficientBalance.eth &&
							hasSufficientBalance.wild &&
							hasSufficientBalance.nft &&
							hasSufficientBalance.genesisNft
						)
					}
					onPress={() => setStep(Steps.PersonalInfo)}
				>
					Continue
				</Button>
			</>
		);
	};

	const personalInfoInputChange = (type: string, val: string) => {
		switch (type) {
			case 'firstName':
				setFirstName(val);
				break;
			case 'lastName':
				setLastName(val);
				break;
			case 'twitter':
				setTwitter(val);
				break;
			case 'discord':
				setDiscord(val);
				break;
			case 'telegram':
				setTelegram(val);
				break;
			default:
				break;
		}
	};

	const personalInfo = () => {
		return (
			<>
				<p>
					Please add some additional personal info. Providing additional
					optional information helps us resolve questions or conflicts that may
					prevent your entry from being counted. We recognize this reduces
					anonymity, but it helps us reduce bots and keep things fair! Any
					attempt to game the system for multiple entries will result in entries
					being disqualified.
				</p>
				<div className={styles.PersonalInfo}>
					<div className={styles.CombinedFirstAndLastFields}>
						<div className={`${styles.Email} ${styles.firstName}`}>
							<Input
								className={styles.Input}
								onChange={(val) => personalInfoInputChange('firstName', val)}
								placeholder={'First Name'}
								value={firstName}
							/>
						</div>
						<div className={styles.Email}>
							<Input
								className={styles.Input}
								onChange={(val) => personalInfoInputChange('lastName', val)}
								placeholder={'Last Name'}
								value={lastName}
							/>
						</div>
					</div>
					<div className={styles.Email}>
						<Input
							className={styles.Input}
							onChange={onInputChange}
							placeholder={'Email Address'}
							value={userEmail}
						/>
						{/* {emailError && (
							<span className={styles.emailError}>{emailError}</span>
						)} */}
					</div>
					<div className={styles.Email}>
						<Input
							className={styles.Input}
							onChange={(val) => personalInfoInputChange('twitter', val)}
							placeholder={'Twitter'}
							value={twitter}
						/>
					</div>
					<div className={styles.Email}>
						<Input
							className={styles.Input}
							onChange={(val) => personalInfoInputChange('discord', val)}
							placeholder={'Discord ID'}
							value={discord}
						/>
					</div>
					<div className={styles.Email}>
						<Input
							className={styles.Input}
							onChange={(val) => personalInfoInputChange('telegram', val)}
							placeholder={'Telegram'}
							value={telegram}
						/>
					</div>
				</div>
				{emailError && <span className={styles.Error}>{emailError}</span>}
				<Button className={styles.Button} onPress={onSubmitEmail}>
					Continue
				</Button>
			</>
		);
	};

	const followSocial = () => {
		return (
			<>
				<p className={styles.Success}>You successfully joined the raffle!</p>
				<div className={styles.Socials}>
					<span>Follow our socials to get the latest info:</span>
					<div>
						<a
							href={'https://discord.com/invite/wilderworld'}
							target="_blank"
							rel="noreferrer"
						>
							<img src={iconDiscord} alt="discord" />
							Discord
						</a>
						<a
							href={'https://twitter.com/WilderWorld'}
							target="_blank"
							rel="noreferrer"
						>
							<img alt="twitter" src={iconTwitter} />
							Twitter
						</a>
					</div>
				</div>
				<Button className={styles.Button} onPress={props.closeOverlay}>
					Finish
				</Button>
			</>
		);
	};

	const stepNode = () => {
		switch (step) {
			case Steps.AboutRaffle:
				return <>{aboutRaffle()}</>;
			case Steps.WalletAddress:
				return <>{walletAddress()}</>;
			case Steps.CurrentBalances:
				return <>{currentBalances()}</>;
			case Steps.PersonalInfo:
				return <>{personalInfo()}</>;
			case Steps.FollowSocial:
				return <>{followSocial()}</>;
			default:
				return 'error';
		}
	};

	return (
		<Wizard.Container
			header={'Join The Mintlist Raffle'}
			className={styles.Container}
		>
			<section>
				{!isLoadingRegistration && <>{stepNode()}</>}
				{isLoadingRegistration && (
					<div className={styles.Loading}>
						<span>{status || 'Loading'}</span>
						<Spinner />
					</div>
				)}
			</section>
		</Wizard.Container>
	);
};
