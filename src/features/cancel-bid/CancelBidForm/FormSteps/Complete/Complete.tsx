import { FC } from 'react';

import { Step } from '../hooks';

import { NFTDetails, TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

export interface CompleteProps {
	zna: string;
	step: Step;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ zna, step, onClose }) => {
	return (
		<>
			<NFTDetails zna={zna} step={step} />

			<div className={styles.Container}>
				<TextContent
					variant={'success'}
					textContent={'Success! Bid Cancelled.'}
				/>

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText={'Finish'}
					onClickPrimaryButton={onClose}
				/>
			</div>
		</>
	);
};
