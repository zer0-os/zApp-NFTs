import { FC } from 'react';

import Wizard from '@zero-tech/zui/src/components/Wizard';

interface ConfirmStepProps {
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmStepProps> = ({ onConfirm }) => (
	<>
		<Wizard.Confirmation
			onClickPrimaryButton={onConfirm}
			primaryButtonText={'Confirm'}
			isPrimaryButtonActive
			message={
				<p>
					This transaction is about to be seared upon the blockchain. There’s no
					going back.
				</p>
			}
		/>
	</>
);

export const WaitingForWallet: FC = () => (
	<>
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
		<Wizard.Header header={'Processing Transaction'} />
		<Wizard.Loading message={'Your transaction is being processed...'} />
	</>
);
