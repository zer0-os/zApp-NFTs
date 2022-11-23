import { FC } from 'react';

import { NFTDetails, TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface CompleteProps {
	zna: string;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ zna, onClose }) => {
	const textContent = 'Your bid was successfully placed.';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent variant={'success'} textContent={textContent} />

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
