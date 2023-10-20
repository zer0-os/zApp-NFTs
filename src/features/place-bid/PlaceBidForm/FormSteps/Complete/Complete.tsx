import { FC } from 'react';

import { NFTDetails } from '../ui';
import { FormTextContent } from '../../../../ui';
import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

export interface CompleteProps {
	zna: string;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ zna, onClose }) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<FormTextContent
					variant={'success'}
					textContent={'Your bid was successfully placed.'}
				/>

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText="Finish"
					onClickPrimaryButton={onClose}
				/>
			</div>
		</>
	);
};
