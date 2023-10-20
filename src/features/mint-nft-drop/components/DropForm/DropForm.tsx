/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import { useMint } from '../../lib/useMint';
import { useBalanceEth } from '../../../../lib/hooks';

import { Info, SelectAmount, Finished, Loading } from './Steps';
import { Wizard } from '@zero-tech/zui';

import { Stage, Step } from '../../lib/types';

import styles from './DropForm.module.scss';
import { SINGULAR_NAME } from '../../lib/drop-data';

const HEADER = 'Mint Your ' + SINGULAR_NAME;
const SUB_HEADER = 'Your ' + SINGULAR_NAME + ' in the Metaverse awaits!';

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
	pricePerNFT: BigNumber;
};

export const DropForm = (props: MintDropNFTWizardProps) => {
	const [step, setStep] = useState<Step>(Step.Info);

	const { mint } = useMint();
	const { data: balanceEth } = useBalanceEth();

	const [transactionStatus, setTransactionStatus] = useState<string>(
		'Confirm wallet transaction to begin minting your Wheels',
	);
	const [transactionError, setTransactionError] = useState<
		string | undefined
	>();

	const onContinueFromInfo = () => {
		if (balanceEth !== undefined) {
			if (balanceEth.lt(props.pricePerNFT)) {
				setStep(Step.InsufficientFunds);
			} else {
				setStep(Step.SelectAmount);
			}
		} else {
			setStep(Step.CheckingBalance);
		}
	};

	const submitTransaction = (numWheels: number) => {
		setStep(Step.PendingWalletApproval);
		setTransactionError(undefined);

		const errorCallback = (error: string) => {
			setStep(Step.Info);
			setTransactionError(error);
		};

		const finishedCallback = () => {
			setStep(Step.Finished);
		};

		mint(numWheels).then(finishedCallback).catch(errorCallback);
	};

	const onBack = () => {
		if (step === Step.InsufficientFunds || step === Step.SelectAmount) {
			setStep(Step.Info);
		}
	};

	useEffect(() => {
		if (balanceEth !== undefined && step === Step.CheckingBalance) {
			setStep(Step.SelectAmount);
		}
	}, [balanceEth]);

	const getFlowSection = () => {
		if (props.dropStage === undefined) {
			return;
		}
		if (step === Step.Info) {
			return (
				<Info
					onContinue={() => console.warn('unsupported')}
					onDismiss={() => console.warn('unsupported')}
				/>
			);
		}
		if (step === Step.SelectAmount) {
			return <SelectAmount onBack={onBack} onContinue={submitTransaction} />;
		}
		if (step === Step.CheckingBalance) {
			return <Loading text={'Checking your ETH balance'} />;
		}
		if (step === Step.PendingWalletApproval) {
			return <Loading isMinting text={transactionStatus} />;
		}
		if (step === Step.InsufficientFunds) {
			return (
				<Info
					onContinue={() => console.warn('unsupported')}
					onDismiss={() => console.warn('unsupported')}
				/>
			);
		}
		if (step === Step.Finished) {
			return <Finished onFinish={props.onFinish} />;
		}
	};

	return (
		<Wizard.Container>
			<Wizard.Header header={HEADER} subHeader={SUB_HEADER}></Wizard.Header>
			<div className={styles.Container}>{getFlowSection()}</div>
		</Wizard.Container>
	);
};
