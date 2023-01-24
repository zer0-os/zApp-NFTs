import { FC } from 'react';

import { useDomainSettingsForm } from './hooks';
import { useFormSteps } from './FormSteps/hooks';

import { Wizard } from '@zero-tech/zui/components';
import { IconXClose } from '@zero-tech/zui/components/Icons';

import styles from './DomainSettingsForm.module.scss';

interface DomainSettingsFormProps {
	zna: string;
	onClose: () => void;
}

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	const {
		step,
		buttonGroup,
		footerStatusText,
		loadingStatusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	} = useDomainSettingsForm(zna, onClose);

	const { content } = useFormSteps({
		zna,
		step,
		buttonGroup,
		footerStatusText,
		loadingStatusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	});

	return (
		<div className={styles.FormContainer}>
			<Wizard.Container
				className={styles.Container}
				header={'My Domain Settings'}
				subHeader={zna}
				sectionDivider
			>
				<form className={styles.Form}>{content}</form>
			</Wizard.Container>

			<div className={styles.Close} onClick={onClose}>
				<IconXClose size={24} />
			</div>
		</div>
	);
};
