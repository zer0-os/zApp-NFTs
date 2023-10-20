import { FC, ReactNode, useCallback, useRef } from 'react';

import { Alert, AlertProps } from '@zero-tech/zui';

import styles from './TextArea.module.scss';

interface TextAreaProps {
	label?: string;
	maxLength?: number;
	minLength?: number;
	value: string;
	placeholder?: string;
	isDisabled?: boolean;
	alert?: { variant: AlertProps['variant']; text: ReactNode };
	onChange: (value: any) => void;
}

export const TextArea: FC<TextAreaProps> = ({
	label,
	alert,
	maxLength,
	minLength,
	value,
	placeholder,
	isDisabled,
	onChange,
}: TextAreaProps) => {
	const textAreaRef = useRef<HTMLTextAreaElement>();

	const isError =
		!Boolean(value) &&
		(value?.length >= maxLength || value?.length <= minLength);

	const handleOnChange = useCallback(() => {
		if (!isDisabled) {
			onChange(textAreaRef.current.value);
		}
	}, [onChange, isDisabled]);

	return (
		<>
			<div className={styles.TextAreaContainer}>
				{label && <label className={styles.TextAreaLabel}>{label}</label>}
				<textarea
					className={styles.TextArea}
					data-variant={isError && 'error'}
					inputMode={'text'}
					maxLength={maxLength}
					minLength={minLength}
					value={value}
					placeholder={placeholder}
					disabled={isDisabled}
					ref={textAreaRef}
					onChange={handleOnChange}
				/>
				{isError && alert && (
					<Alert className={styles.Alert} variant={alert.variant}>
						{alert.text}
					</Alert>
				)}
			</div>
		</>
	);
};
