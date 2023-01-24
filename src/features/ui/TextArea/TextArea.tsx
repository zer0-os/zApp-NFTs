import { FC, ReactNode } from 'react';

import { Alert, AlertProps } from '@zero-tech/zui/components';

import styles from './TextArea.module.scss';

interface TextAreaProps {
	label?: string;
	maxLength?: number;
	description: string;
	placeholder?: string;
	isDisabled?: boolean;
	alert?: { variant: AlertProps['variant']; text: ReactNode };
	onChange: (event: any) => void;
}

export const TextArea: FC<TextAreaProps> = ({
	label,
	alert,
	maxLength,
	description,
	placeholder,
	isDisabled,
	onChange,
}: TextAreaProps) => {
	const isError = description.length >= maxLength;
	return (
		<>
			<div className={styles.TextAreaContainer}>
				{label && <label className={styles.TextAreaLabel}>{label}</label>}
				<textarea
					className={styles.TextArea}
					inputMode={'text'}
					maxLength={maxLength}
					value={description}
					placeholder={placeholder}
					disabled={isDisabled}
					onChange={onChange}
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
