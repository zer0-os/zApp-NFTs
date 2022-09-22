//- React Imports
import React, { FC } from 'react';

//- Style Imports
import styles from './WrappedInput.module.scss';

//- Component Imports
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { Input } from '@zero-tech/zui/components/Input';

export type WrappedInputProps = {
	className?: string;
	type?: string;
	label: string;
	value: string;
	placeholder: string;
	info: string;
	hasError: boolean;
	helperText: string;
	onChange: (event: any) => void;
};

export const WrappedInput: FC<WrappedInputProps> = ({
	className = '',
	type = 'text',
	label,
	value,
	placeholder,
	info,
	hasError,
	helperText,
	onChange,
}) => (
	<div className={className}>
		<div className={styles.Container}>
			<p className={styles.Label}>{label}</p>
			<InfoTooltip content={info} />
		</div>
		<Input
			type={type}
			value={value}
			placeholder={placeholder}
			error={hasError}
			helperText={helperText}
			onChange={onChange}
		/>
	</div>
);
