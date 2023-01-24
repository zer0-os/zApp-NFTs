import { FC } from 'react';

import { useDomainSettingsData } from '../../../../useDomainSettingsData';

import { Switch } from '../../../../../ui';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';

import styles from './SwitchSettings.module.scss';

export interface SwitchSettingsProps {
	zna: string;
}

export const SwitchSettings: FC<SwitchSettingsProps> = ({ zna }) => {
	const { localState, localActions } = useDomainSettingsData(zna);

	const settings: SwitchSettingsGroupType[] = [
		{
			id: 'domain-mint-requests-switch',
			label: 'Domain Mint Requests',
			toggled: localState.isMintable,
			onPress: localActions.setIsMintable,
			tooltip:
				'Allow members to make a stake offer in order to mint NFTs on your domain. Turn off if your domain is not intended to be open for others to mint upon',
		},
		{
			id: 'domain-bidding-switch',
			label: 'Domain Bidding',
			toggled: localState.isBiddable,
			onPress: localActions.setIsBiddable,
			tooltip:
				'Allow bidding on your domain. Turn off if the domain is not intended to be sold.',
		},
		{
			id: 'domain-grid-view-switch',
			label: 'Domain in Grid View by Default',
			toggled: localState.gridViewByDefault,
			onPress: localActions.setGridViewByDefault,
			tooltip:
				'Grid view has larger image previews which can benefit domains with a focus on art rather than statistics.',
		},
		{
			id: 'domain-custom-header',
			label: 'Custom Domain Header',
			toggled: localState.customDomainHeader,
			onPress: localActions.setCustomDomainHeader,
			tooltip:
				'Change the first column header of list view. By default this is ‘Domain’.',
		},
	];

	return (
		<div className={styles.Container}>
			<h5>Advanced Domain Settings</h5>

			<SwitchSettingsGroup
				settings={settings}
				isMetadaLocked={localState.isMetadataLocked}
			/>
		</div>
	);
};

/*********************
 * SwitchSettingsGroup
 *********************/

type SwitchSettingsGroupType = {
	id: string;
	label: string;
	tooltip: string;
	toggled: boolean;
	onPress: (v: boolean) => void;
};

interface SwitchSettingsGroupProps {
	settings: SwitchSettingsGroupType[];
	isMetadaLocked: boolean;
}

const SwitchSettingsGroup = ({
	settings,
	isMetadaLocked,
}: SwitchSettingsGroupProps) => {
	return (
		<ul className={styles.SwitchGroup}>
			{settings.map((s) => (
				<li key={s.id} className={styles.SwitchRow}>
					<Switch
						label={s.label}
						toggled={s.toggled}
						isDisabled={isMetadaLocked}
						onPress={s.onPress}
					/>
					{!isMetadaLocked && <InfoTooltip content={s.tooltip} />}
				</li>
			))}
		</ul>
	);
};
