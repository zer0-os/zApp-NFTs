import { FC } from 'react';

import { useDomainSettingsData } from '../../useDomainSettingsData';

import { InputSettings, SwitchSettings } from './ui';

import styles from './DomainSettingsBody.module.scss';

export interface DomainSettingsBodyProps {
	zna: string;
}

export const DomainSettingsBody: FC<DomainSettingsBodyProps> = ({ zna }) => {
	const { localState } = useDomainSettingsData(zna);

	return (
		<div
			className={styles.Container}
			data-variant={localState.isMetadataLocked ? 'locked' : 'unlocked'}
		>
			<InputSettings zna={zna} />
			<SwitchSettings zna={zna} />
		</div>
	);
};
