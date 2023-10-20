import { FC } from 'react';

import { InfoTooltip } from '@zero-tech/zui';

import styles from './InputWrapper.module.scss';
import classNames from 'classnames';

export type InputWrapperProps = {
	children: React.ReactNode;
	className?: string;
	label: string;
	info: string;
};

export const InputWrapper: FC<InputWrapperProps> = ({
	children,
	className = '',
	label,
	info,
}) => {
	return (
		<div className={classNames(styles.Container, className)}>
			<div className={styles.LabelContainer}>
				<p className={styles.Label}>{label}</p>
				<InfoTooltip content={info} />
			</div>
			{children}
		</div>
	);
};
