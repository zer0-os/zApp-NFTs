import { FC } from 'react';

import { ToggleGroup, ToggleOptions } from '@zero-tech/zui/components';
import { InputWrapper } from '../InputWrapper/InputWrapper';

import styles from './WrappedToggleInput.module.scss';

export type WrappedToggleInputProps = {
	className?: string;
	options: ToggleOptions;
	label: string;
	value: string;
	info: string;
	href?: string;
	onChange: (selection: string) => void;
};

export const WrappedToggleInput: FC<WrappedToggleInputProps> = ({
	className = '',
	options = [],
	label,
	value,
	info,
	href,
	onChange,
}) => (
	<InputWrapper className={className} label={label} info={info}>
		<ToggleGroup
			options={options}
			variant="default"
			selectionType="single"
			selection={value}
			onSelectionChange={onChange}
			isRequired
		/>
		{href && (
			<a href={href} className={styles.LearnMore}>
				Learn more
			</a>
		)}
	</InputWrapper>
);
