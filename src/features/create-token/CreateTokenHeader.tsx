import { FC, useContext } from 'react';

import { IconCross } from '@zero-tech/zui/components/Icons';
import { Wizard, StepBar } from '@zero-tech/zui/components';
import { CreateTokenFormContext, steps } from './';

import styles from './CreateTokenHeader.module.scss';

interface CreateTokenHeaderProps {
	subtitle: string;
	onClose: () => void;
}

export const CreateTokenHeader: FC<CreateTokenHeaderProps> = ({
	subtitle,
	onClose,
}) => {
	const { title, stepId, onStepUpdate } = useContext(CreateTokenFormContext);

	return (
		<div className={styles.Container}>
			<Wizard.Header
				header={title}
				headerInfo="Create a token currency for a domain or DAO. The standard is the ERC-20 token standard."
				subHeader={subtitle}
				sectionDivider={false}
			>
				<div className={styles.Close} onClick={onClose}>
					<IconCross size={24} />
				</div>
				<StepBar
					currentStepId={stepId}
					steps={steps}
					onChangeStep={onStepUpdate}
				/>
			</Wizard.Header>
		</div>
	);
};
