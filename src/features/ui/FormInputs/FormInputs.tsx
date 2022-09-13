import { FC, useState } from 'react';

import Input from '@zero-tech/zui/src/components/Input/Input';
import { Button } from '@zero-tech/zui/src/components';

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
	const [inputValue, setInputValue] = useState<string | undefined>();

	const onSubmit = () => onSubmitProps(inputValue);

	const handleChange = (val: string) => {
		setInputValue(val);
		setHelperText('');
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
