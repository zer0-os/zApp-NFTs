/* eslint-disable react-hooks/exhaustive-deps */

// React Imports
import { useEffect, useState } from 'react';

// Step Imports
import Info from './Steps/Info/Info';
import SelectAmount from './Steps/SelectAmount/SelectAmount';
import InsufficientFunds from './Steps/InsufficientFunds/InsufficientFunds';
import Finished from './Steps/Finished/Finished';

// Configuration
import { Stage, Step, TransactionData } from './types';

// Style Imports
import styles from './MintDropNFTWizard.module.scss';
import { Loading } from './Steps/Loading/Loading';
import { Wizard } from '@zero-tech/zui/components';

export type MintDropNFTWizardProps = {
	balanceEth?: number;
	dropStage?: Stage;
	onClose: () => void;
	onFinish: () => void;
	isUserWhitelisted?: boolean;
	maxPurchasesPerUser?: number;
	numberPurchasedByUser?: number;
	userId?: string;
	wheelsTotal?: number;
	wheelsMinted?: number;
	pricePerNFT: number;
	onSubmitTransaction: (data: TransactionData) => void;
};

const MintDropNFTWizard = (props: MintDropNFTWizardProps) => {

	const [step, setStep] = useState<Step>(Step.Info);

	const [transactionStatus, setTransactionStatus] = useState<string>(
		'Confirm wallet transaction to begin minting your Wheels',
	);
	const [transactionError, setTransactionError] = useState<
		string | undefined
	>();


	const onContinueFromInfo = () => {
		if (props.balanceEth !== undefined) {
			if (props.balanceEth < props.pricePerNFT) {
				setStep(Step.InsufficientFunds);
			} else {
				setStep(Step.SelectAmount);
			}
		} else {
			setStep(Step.CheckingBalance);
		}
	};

	const submitTransaction = (numWheels: number) => {
		// Switch to "pending wallet approval" step
		setStep(Step.PendingWalletApproval);
		setTransactionError(undefined);

		const statusCallback = (status: string) => {
			setTransactionStatus(status);
		};

		const errorCallback = (error: string) => {
			setStep(Step.Info);
			setTransactionError(error);
		};

		const finishedCallback = () => {
			setStep(Step.Finished);
		};

		const data: TransactionData = {
			numWheels,
			statusCallback,
			errorCallback,
			finishedCallback,
		};
		props.onSubmitTransaction(data);
	};

	const onBack = () => {
		if (step === Step.InsufficientFunds || step === Step.SelectAmount) {
			setStep(Step.Info);
		}
	};

	useEffect(() => {
		if (props.balanceEth !== undefined && step === Step.CheckingBalance) {
			setStep(Step.SelectAmount);
		}
	}, [props.balanceEth]);


	const getFlowSection = () => {
		if (props.dropStage === undefined) {
			return;
		}
		if (step === Step.Info) {
			return (
				<Info
					dropStage={props.dropStage!}
					errorMessage={transactionError}
					isUserWhitelisted={props.isUserWhitelisted}
					isWalletConnected={props.userId !== undefined}
					maxPurchasesPerUser={props.maxPurchasesPerUser}
					pricePerNFT={props.pricePerNFT}
					numberPurchasedByUser={props.numberPurchasedByUser}
					onContinue={onContinueFromInfo!}
					onDismiss={props.onClose}
					wheelsMinted={props.wheelsMinted!}
					wheelsTotal={props.wheelsTotal!}
				/>
			);
		}
		if (step === Step.SelectAmount) {
			return (
				<SelectAmount
					dropStage={props.dropStage!}
					balanceEth={props.balanceEth!}
					error={transactionError}
					pricePerNFT={props.pricePerNFT}
					maxPurchasesPerUser={props.maxPurchasesPerUser}
					numberPurchasedByUser={props.numberPurchasedByUser!}
					onBack={onBack}
					onContinue={submitTransaction}
					remainingWheels={props.wheelsTotal! - props.wheelsMinted!}
				/>
			);
		}
		if (step === Step.CheckingBalance) {
			return <Loading text={'Checking your ETH balance'} />;
		}
		if (step === Step.PendingWalletApproval) {
			return <Loading isMinting text={transactionStatus} />;
		}
		if (step === Step.InsufficientFunds) {
			return (
				<InsufficientFunds
					pricePerNFT={props.pricePerNFT}
					onDismiss={props.onClose}
				/>
			);
		}
		if (step === Step.Finished) {
			return <Finished onFinish={props.onFinish} />;
		}
	};

	return (
		<>
			<Wizard.Header
				header="Mint Your GEN"
				subHeader="Your GEN in the Metaverse awaits!"
			>
			</Wizard.Header>
			<Wizard.Container className={`${styles.Container}`} >{getFlowSection()}</Wizard.Container>
			
		</>
	);
};

export default MintDropNFTWizard;
