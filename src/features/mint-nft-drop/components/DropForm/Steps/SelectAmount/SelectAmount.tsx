import { useState } from 'react';

import { useWeb3 } from '../../../../../../lib/hooks';
import { useDrop } from '../../../../lib/useDrop';
import { CURRENT_SALE } from '../../../../lib/drop-data';
import { useDropUserPurchases } from '../../../../lib/useDropUserPurchases';

import { Wizard } from '@zero-tech/zui';
import { Input } from '@zero-tech/zui';

import styles from './SelectAmount.module.scss';

///////////////////
// Select Amount //
///////////////////

export interface SelectAmountProps {
	onBack: () => void;
	onContinue: (numWheels: number) => void;
}

export const SelectAmount = (props: SelectAmountProps) => {
	const {
		account,
		amount,
		hasUserAcceptedTerms,
		maxMintsRemaining,
		pricePerNFT,
		setAmount,
		setHasUserAcceptedTerms,
	} = useSelectAmount();

	const isAmountValidNumber =
		Boolean(amount?.length) && !isNaN(Number(amount)) && Number(amount) >= 0;

	// @todo no account should be handled in DropForm
	if (!account) {
		return <div>no account</div>;
	}

	return (
		<form
			onSubmit={() => {
				if (isAmountValidNumber) {
					props.onContinue(Number(amount));
				}
			}}
		>
			<p>
				How many GENs would you like to Mint? The number you enter will be
				minted in one transaction, saving on GAS fees. Each GEN costs{' '}
				<b>{pricePerNFT} ETH</b>.
			</p>
			{/* @todo proper number formatting */}
			<Input
				type={'number'}
				onChange={(val: string) => setAmount(val)}
				placeholder={`Number of GENs (Max. ${maxMintsRemaining})`}
				value={amount}
				inputMode={'numeric'}
			/>

			<Terms
				hasUserAcceptedTerms={hasUserAcceptedTerms}
				toggleAcceptTerms={() => setHasUserAcceptedTerms(!hasUserAcceptedTerms)}
			/>

			<Wizard.Buttons
				onClickPrimaryButton={() => console.warn('unsupported')}
				isPrimaryButtonActive={isAmountValidNumber && hasUserAcceptedTerms}
			/>
		</form>
	);
};

///////////
// Terms //
///////////

interface TermsProps {
	hasUserAcceptedTerms: boolean;
	toggleAcceptTerms: (event: any) => void;
}

const Terms = ({ hasUserAcceptedTerms, toggleAcceptTerms }: TermsProps) => {
	return (
		<div className={styles.Terms}>
			<div
				onClick={toggleAcceptTerms}
				className={hasUserAcceptedTerms ? styles.Selected : ''}
			></div>
			<input
				type="radio"
				id="termsAndConditions"
				name="terms"
				value="terms"
				checked={hasUserAcceptedTerms}
				onClick={toggleAcceptTerms}
				readOnly
			/>
			<label className="no-select" htmlFor="termsAndConditions">
				I agree to the auction{' '}
				<a
					href="https://zine.wilderworld.com/terms-and-conditions/"
					className="text-button"
					target="_blank"
					rel="noreferrer"
				>
					terms and conditions
				</a>
			</label>
		</div>
	);
};

/////////////////////
// useSelectAmount //
/////////////////////

const useSelectAmount = () => {
	const { account } = useWeb3();
	const { data: dropData } = useDrop(CURRENT_SALE);
	const { data: userPurchaseData } = useDropUserPurchases(CURRENT_SALE);

	const [amount, setAmount] = useState<string | undefined>();
	const [hasUserAcceptedTerms, setHasUserAcceptedTerms] =
		useState<boolean>(false);

	const remainingUserMints = userPurchaseData?.max - userPurchaseData?.minted;
	const remainingMints = dropData?.amountForSale - dropData?.amountSold;

	const maxMintsRemaining = Math.min(remainingUserMints, remainingMints);

	const isAmountValidNumber =
		Boolean(amount?.length) && !isNaN(Number(amount)) && Number(amount) >= 0;

	return {
		isAmountValidNumber,
		account,
		maxMintsRemaining,
		amount,
		setAmount,
		pricePerNFT: dropData.pricePerNFT,
		hasUserAcceptedTerms,
		setHasUserAcceptedTerms,
	};
};
