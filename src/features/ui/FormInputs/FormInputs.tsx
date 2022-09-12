import { FC, useState } from 'react';

import Input from '@zero-tech/zui/src/components/Input/Input';
import { Button } from '@zero-tech/zui/src/components';

import styles from './FormInputs.module.scss';

export interface Message {
	text: string;
	isError?: boolean;
}

export interface FormInputsProps {
	action: 'transfer';
	label?: string;
	error?: boolean;
	message?: Message;
	helperText?: string;
	placeholder?: string;
	instructionText?: string;
	isTransactionPending?: boolean;
	onSubmit: (walletAddress: string) => void;
}

export const FormInputs: FC<FormInputsProps> = ({
	action,
	label,
	error,
	message,
	helperText,
	placeholder,
	instructionText,
	isTransactionPending,
	onSubmit: onSubmitProps,
}) => {
	const [inputValue, setInputValue] = useState<string | undefined>();

	const onSubmit = () => onSubmitProps(inputValue);

	return (
		<div className={styles.Container}>
			{message && <span className={styles.Error}>{message.text}</span>}
			{instructionText && <p>{instructionText}</p>}
			<Input
				value={inputValue}
				label={label}
				error={error}
				helperText={helperText}
				placeholder={placeholder}
				isDisabled={isTransactionPending}
				onChange={(val: string) => {
					setInputValue(val);
				}}
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
