import { FC } from 'react';

import { useFormSteps } from './FormSteps/hooks';
import { useTransferOwnershipForm } from './hooks/useTransferOwnershipForm';

import { Wizard } from '@zero-tech/zui';

import styles from './TransferOwnershipForm.module.scss';

export interface TransferOwnershipFormProps {
	zna: string;
	onClose: () => void;
}

export const TransferOwnershipForm: FC<TransferOwnershipFormProps> = ({
	zna,
	onClose,
}) => {
	const { step, error, statusText, onConfirmInput, onConfirmTransfer } =
		useTransferOwnershipForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		onClose,
		onConfirmInput,
		onConfirmTransfer,
	});

	return (
		<Wizard.Container header="Transfer Ownership">
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
