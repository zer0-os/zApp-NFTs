import { FC } from 'react';

import { ToggleGroup, ToggleOptions } from '@zero-tech/zui/components';
import { Wrapper } from '../Wrapper/Wrapper';

import styles from './WrappedToggleInput.module.scss';

export type WrappedToggleInputProps = {
	className?: string;
	options: ToggleOptions;
	label: string;
	value: string;
	info: string;
	learnMoreHref?: string;
	onChange: (selection: string) => void;
};

export const WrappedToggleInput: FC<WrappedToggleInputProps> = ({
	className = '',
	options = [],
	label,
	value,
	info,
	learnMoreHref,
	onChange,
}) => (
	<Wrapper className={className} label={label} info={info}>
		<ToggleGroup
			options={options}
			variant="default"
			selectionType="single"
			selection={value}
			onSelectionChange={onChange}
			isRequired
		/>
		{learnMoreHref && (
			<a href={learnMoreHref} className={styles.LearnMore}>
				Learn more
			</a>
		)}
	</Wrapper>
);
