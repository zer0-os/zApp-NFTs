import React, { FC } from 'react';

import { Input } from '@zero-tech/zui/components/Input';
import { InputWrapper } from '../InputWrapper/InputWrapper';

export type WrappedInputProps = {
	className?: string;
	type?: string;
	label: string;
	value: string;
	placeholder: string;
	infoTooltipText: string;
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
	infoTooltipText,
	hasError,
	helperText,
	onChange,
}) => (
	<InputWrapper className={className} label={label} infoTooltipText={infoTooltipText}>
		<Input
			type={type}
			value={value}
			placeholder={placeholder}
			error={hasError}
			helperText={helperText}
			onChange={onChange}
		/>
	</InputWrapper>
);
