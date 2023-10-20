import { FC, useState } from 'react';

import { Button, Input } from '@zero-tech/zui';

import styles from './FormInputs.module.scss';

export interface FormInputsProps {
	action: 'transfer';
	label?: string;
	errorMessage?: string;
	placeholder?: string;
	isTransactionPending?: boolean;
	onSubmit: (walletAddress: string) => void;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	label,
	errorMessage,
	placeholder,
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
			<Input
				value={inputValue}
				label={label}
				error={errorMessage !== undefined}
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
