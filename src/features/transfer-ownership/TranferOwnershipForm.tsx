import { FC, ReactNode } from 'react';

import { truncateAddress } from '../../lib/util/domains/domains';
import { useTransferOwnershipForm } from './useTransferOwnershipForm';

import { FormInputs } from '../ui/FormInputs';
import { Confirm, Complete, Transaction } from './FormSteps';
import { Wizard } from '@zero-tech/zui/components';

import { TransferOwnershipFormStep as Step } from './TransferOwnership.constants';

import styles from './TransferOwnership.module.scss';

interface TransferOwnershipProps {
	domainId: string;
	domainTitle: string;
	domainCreator: string;
	onClose: () => void;
}

export const TransferOwnershipForm: FC<TransferOwnershipProps> = ({
	domainId,
	domainTitle,
	domainCreator,
	onClose,
}) => {
	const {
		step,
		error,
		helperText,
		setHelperText,
		onConfirmAddressInput,
		onConfirmTransfer,
	} = useTransferOwnershipForm(domainId);

	const domain = truncateAddress(domainId);
	const creator = truncateAddress(domainCreator);

	let content: ReactNode;

	switch (step) {
		case Step.FORM_INPUT:
			content = (
				<>
					{/* todo: extract */}
					<div className={styles.DetailsContainer}>
						<div className={styles.Media}></div>
						<div className={styles.Details}>
							<h1>{domainTitle}</h1>
							<span>0://{domain}</span>

							<span>Creator: {creator}</span>
						</div>
					</div>

					<FormInputs
						action={'transfer'}
						label={'Ethereum Wallet'}
						error={Boolean(helperText)}
						helperText={helperText}
						placeholder={'Ethereum Wallet'}
						setHelperText={setHelperText}
						instructionText={'Enter recipient address:'}
						onSubmit={onConfirmAddressInput}
					/>
				</>
			);
			break;
		case Step.CONFIRM:
			content = (
				<Confirm
					onConfirm={onConfirmTransfer}
					onClose={onClose}
					errorMessage={error}
				/>
			);
			break;
		case Step.TRANSACTION_APPROVAL:
			content = <Transaction />;
			break;
		case Step.TRANSACTION_IN_PROGRESS:
			content = <Transaction isTransferring />;
			break;
		case Step.COMPLETE:
			content = <Complete onClose={onClose} />;
			break;
	}

	return (
		<form>
			<Wizard.Container header="Transfer Ownership">{content}</Wizard.Container>
		</form>
	);
};
