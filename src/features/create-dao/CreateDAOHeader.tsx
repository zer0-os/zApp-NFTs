import { FC, useContext } from 'react';

import { IconXClose } from '@zero-tech/zui/components/icons';
import { StepBar, Wizard } from '@zero-tech/zui/components';
import { steps, CreateDAOFormContext } from './';

import styles from './CreateDAOHeader.module.scss';

interface CreateTokenHeaderProps {
	subtitle: string;
	onClose: () => void;
}

export const CreateDAOHeader: FC<CreateTokenHeaderProps> = ({
	subtitle,
	onClose,
}) => {
	const { title, stepId, onStepUpdate } = useContext(CreateDAOFormContext);

	return (
		<div className={styles.Container}>
			<Wizard.Header
				header={title}
				headerInfo="Create a decentralized autonomous organization for your domain. You can add members to your DAO where they can come together and be part of a community."
				subHeader={subtitle}
				sectionDivider={false}
			>
				<div className={styles.Close} onClick={onClose}>
					<IconXClose size={24} />
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
