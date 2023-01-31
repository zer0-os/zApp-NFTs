import { FC, useContext } from 'react';

import { DomainSettingsFormContext, steps } from '.';

import { Wizard, StepBar } from '@zero-tech/zui/components';
import { IconXClose } from '@zero-tech/zui/components/Icons';

import styles from './DomainSettingsHeader.module.scss';

interface DomainSettingsHeaderProps {
	subtitle: string;
	onClose: () => void;
}

export const DomainSettingsHeader: FC<DomainSettingsHeaderProps> = ({
	subtitle,
	onClose,
}) => {
	const { header, stepId, onStepUpdate } = useContext(
		DomainSettingsFormContext,
	);

	return (
		<div className={styles.Container}>
			<Wizard.Header
				header={stepId === 'details' ? 'My Domain Settings' : header}
				subHeader={subtitle}
				sectionDivider={stepId === 'complete'}
			>
				<div className={styles.Close} onClick={onClose}>
					<IconXClose size={24} />
				</div>
				{stepId !== 'complete' && (
					<StepBar
						currentStepId={stepId}
						steps={steps}
						onChangeStep={onStepUpdate}
					/>
				)}
			</Wizard.Header>
		</div>
	);
};
