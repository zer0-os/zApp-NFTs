import { FC, useState } from 'react';

import { Button, Input } from '@zero-tech/zui/components';

import styles from './FormInputs.module.scss';

export interface FormInputsProps {
	action: 'transfer';
	label?: string;
	isError?: boolean;
	errorMessage?: string;
	placeholder?: string;
	instructionText?: string;
	isTransactionPending?: boolean;
	onSubmit: (walletAddress: string) => void;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	label,
	isError,
	errorMessage,
	placeholder,
	instructionText,
	isTransactionPending,
	onSubmit: onSubmitProps,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	const onSubmit = () => onSubmitProps(inputValue);

	const handleChange = (val: string) => {
		setInputValue(val);
	};

	return (
		<div className={styles.Container}>
			{instructionText && <p>{instructionText}</p>}
			<Input
				value={inputValue}
				label={label}
				error={isError}
				helperText={errorMessage}
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
