import { FC } from 'react';

import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';

import styles from './Wrapper.module.scss';
import classNames from 'classnames';

export type WrapperProps = {
	children: React.ReactNode;
	className?: string;
	label: string;
	info: string;
};

export const Wrapper: FC<WrapperProps> = ({
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
