import { FC } from 'react';

import { FormStep, steps } from '.';
import classNames from 'classnames/bind';

import { IconXClose } from '@zero-tech/zui/components/Icons';
import { Wizard, StepBar, Step } from '@zero-tech/zui/components';

import styles from './DomainSettingsHeader.module.scss';

const cx = classNames.bind(styles);

interface DomainSettingsHeaderProps {
	zna: string;
	stepId: string;
	headerText: string;
	isTransactionLoading: boolean;
	onClose: () => void;
	onStepUpdate: (step: Step) => void;
}

export const DomainSettingsHeader: FC<DomainSettingsHeaderProps> = ({
	zna,
	stepId,
	headerText,
	isTransactionLoading,
	onClose,
	onStepUpdate,
}) => {
	return (
		<div className={styles.Container}>
			<Wizard.Header
				header={stepId !== FormStep.CONFIRM ? 'My Domain Settings' : headerText}
				subHeader={zna}
				sectionDivider={Boolean(isTransactionLoading)}
			>
				<div className={styles.Close} onClick={onClose}>
					<IconXClose size={24} />
				</div>

				{!isTransactionLoading && (
					<StepBar
						className={cx(styles.StepBar, {
							isDisabled: stepId === FormStep.COMPLETE,
						})}
						currentStepId={stepId}
						steps={steps}
						onChangeStep={onStepUpdate}
					/>
				)}
			</Wizard.Header>
		</div>
	);
};
