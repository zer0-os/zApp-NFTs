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
		errorText,
		statusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	} = useDomainSettingsForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		errorText,
		statusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
		onClose,
	});

	return (
		<div className={styles.Container}>
			<div className={styles.Close} onClick={onClose}>
				<IconXClose size={24} />
			</div>

			<Wizard.Container
				header={'My Domain Settings'}
				subHeader={zna}
				sectionDivider={false}
			>
				<form>{content}</form>
			</Wizard.Container>
		</div>
	);
};
