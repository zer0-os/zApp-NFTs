import { FC } from 'react';

import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { ToggleGroup, ToggleOptions } from '@zero-tech/zui/components';

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
	<div className={className}>
		<div className={styles.Container}>
			<p className={styles.Label}>{label}</p>
			<InfoTooltip content={info} />
		</div>
		<ToggleGroup options={options} variant="default" selectionType='single' selection={value} onSelectionChange={onChange} isRequired />
		{learnMoreHref && <a href={learnMoreHref} className={styles.LearnMore}>Learn more</a>}
	</div>
);
