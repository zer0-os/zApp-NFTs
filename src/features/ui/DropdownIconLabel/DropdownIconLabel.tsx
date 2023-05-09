import { FC } from 'react';

import styles from './DropdownIconLabel.module.scss';

export type DropdownIconLabelProps = {
	icon: JSX.Element;
	label: string;
};

export const DropdownIconLabel: FC<DropdownIconLabelProps> = ({
	icon,
	label,
}) => (
	<div className={styles.Container}>
		{icon}
		<div className={styles.Label}>
			<span>{label}</span>
		</div>
	</div>
);
