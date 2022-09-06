//- React Imports
import React, { FC } from 'react';

//- Style Imports
import styles from './WrappedInput.module.scss';

//- Component Imports
import { InfoTooltip } from '@zero-tech/zui/src/components/InfoTooltip';
import { Input } from '@zero-tech/zui/src/components/Input';

export type WrappedInputProps = {
	label: string;
	value: string;
	placeholder: string;
	info: string;
	hasError: boolean;
	helperText: string;
	onChange: (event: any) => void;
};

export const WrappedInput: FC<WrappedInputProps> = ({
	label,
	value,
	placeholder,
	info,
	hasError,
	helperText,
	onChange,
}) => (
	<>
		<div className={styles.WrappedInputContainer}>
			<p>{label}</p>
			<InfoTooltip content={info} />
		</div>
		<Input
			value={value}
			placeholder={placeholder}
			error={hasError}
			helperText={helperText}
			onChange={onChange}
		/>
	</>
);