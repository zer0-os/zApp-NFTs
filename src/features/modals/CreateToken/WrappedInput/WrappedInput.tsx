//- React Imports
import React, { FC } from 'react';

//- Style Imports
import './WrappedInput.scss';

//- Component Imports
import { InfoTooltip } from '@zero-tech/zui/src/components/InfoTooltip';
import { Input } from '@zero-tech/zui/src/components/Input';

export type WrappedInputProps = {
	value: string;
	placeholder: string;
	info: string;
	onChange: (event: any) => void;
};

export const WrappedInput: FC<WrappedInputProps> = ({
	value,
	placeholder,
	info,
	onChange,
}) => (
	<div className="wrapped-input">
		<div className="wrapped-input-container">
			<p>How many tokens do you want to create?</p>
			<InfoTooltip content={info} />
		</div>
		<Input value={value} placeholder={placeholder} onChange={onChange} />
	</div>
);
