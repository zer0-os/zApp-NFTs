import { FC, ReactNode } from 'react';

import { DomainSettingsModal } from '../DomainSettingsModal';

import styles from './DomainSettingsButton.module.scss';

type DomainSettingsButtonProps = {
	zna: string;
	trigger: ReactNode;
	variant?: 'primary' | 'text';
};

export const DomainSettingsButton: FC<DomainSettingsButtonProps> = ({
	zna,
	trigger,
	variant,
}) => {
	const triggerVariant =
		variant === 'text' ? (
			<p className={styles.TextButton}>{trigger}</p>
		) : (
			trigger
		);

	return <DomainSettingsModal zna={zna} trigger={triggerVariant} />;
};
