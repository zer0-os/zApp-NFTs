import { FC } from 'react';

import Wizard from '@zero-tech/zui/src/components/Wizard';

import styles from './TransferOwnership.module.scss';

interface ConfirmStepProps {
	onConfirm?: () => void;
	errorMessage?: string;
}

export const TransferText: FC<ConfirmStepProps> = ({ errorMessage }) => (
	<div>
		<p>
			This transaction is about to be seared upon the blockchain. There’s no
			going back.
		</p>
		{errorMessage !== undefined && (
			<span className={styles.ErrorMessage}>{errorMessage}</span>
		)}
	</div>
);

export const Confirm: FC<ConfirmStepProps> = ({ onConfirm, errorMessage }) => (
	<>
		<Wizard.Confirmation
			onClickPrimaryButton={onConfirm}
			onClickSecondaryButton={() => console.log('onclose')}
			primaryButtonText={'Confirm'}
			secondaryButtonText={'Cancel'}
			isPrimaryButtonActive
			isSecondaryButtonActive
			message={<TransferText errorMessage={errorMessage} />}
		/>
	</>
);

export const WaitingForWallet: FC = () => (
	<>
		{/* todo : duplicate text */}
		<Wizard.Loading
			message={
				<div>
					<p>
						This transaction is about to be seared upon the blockchain. There’s
						no going back.
					</p>
					<p>Please accept wallet transaction...</p>
				</div>
			}
		/>
	</>
);

export const Processing = () => (
	<>
		<Wizard.Loading
			message={
				<div>
					<p>
						This transaction is about to be seared upon the blockchain. There’s
						no going back.
					</p>
					<p>Your transaction is being processed...</p>
				</div>
			}
		/>
	</>
);

export const Complete: FC<ConfirmStepProps> = ({ errorMessage }) => (
	<>
		<Wizard.Confirmation
			onClickPrimaryButton={() => {}}
			primaryButtonText={'Finish'}
			isPrimaryButtonActive
			message={<TransferText errorMessage={errorMessage} />}
		/>
	</>
);
