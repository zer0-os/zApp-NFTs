import { FC } from 'react';

import { NFTDetails } from '../../ui/NFTDetails';
import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface CompleteProps {
	zna: string;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ zna, onClose }) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<span className={styles.TextContent} data-variant={'success'}>
					{'Your bid was successfully placed.'}
				</span>

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
