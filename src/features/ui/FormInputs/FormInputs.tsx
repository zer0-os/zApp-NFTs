import { FC, useState } from 'react';

import { Button, Input } from '@zero-tech/zui/components';

import styles from './FormInputs.module.scss';

export interface FormInputsProps {
	action: 'transfer';
	label?: string;
	error?: boolean;
	helperText?: string;
	setHelperText?: (text: string) => void;
	placeholder?: string;
	instructionText?: string;
	isTransactionPending?: boolean;
	onSubmit: (walletAddress: string) => void;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	label,
	error,
	helperText,
	setHelperText,
	placeholder,
	instructionText,
	isTransactionPending,
	onSubmit: onSubmitProps,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	const onSubmit = () => onSubmitProps(inputValue);

	const handleChange = (val: string) => {
		setInputValue(val);
		setHelperText(undefined);
	};

	return (
		<div className={styles.Container}>
			{instructionText && <p>{instructionText}</p>}
			<Input
				value={inputValue}
				label={label}
				error={error}
				helperText={helperText}
				placeholder={placeholder}
				isDisabled={isTransactionPending}
				onChange={handleChange}
			/>
			<div className={styles.ButtonContainer}>
				<Button
					className={styles.Button}
					isLoading={isTransactionPending}
					isDisabled={!inputValue || isTransactionPending}
					onPress={onSubmit}
				>
					{action}
				</Button>
			</div>
		</div>
	);
};
