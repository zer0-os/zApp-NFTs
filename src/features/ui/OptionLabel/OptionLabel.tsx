import { ReactNode } from 'react';

import styles from './OptionLabel.module.scss';

type OptionLabelProps = {
	icon: ReactNode;
	label: string;
};

export const OptionLabel = ({ icon, label }: OptionLabelProps) => (
	<div className={styles.Container}>
		{icon} {label}
	</div>
);
