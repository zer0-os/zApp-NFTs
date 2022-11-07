import { FC } from 'react';

import { useFormSteps, useFormStepsProps } from './FormSteps/hooks';
import { useTransferOwnershipForm } from './hooks/useTransferOwnershipForm';

import { Wizard } from '@zero-tech/zui/components';

import styles from './TransferOwnershipForm.module.scss';

export interface TransferOwnershipFormProps {
	zna: string;
	onClose: useFormStepsProps['onClose'];
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
