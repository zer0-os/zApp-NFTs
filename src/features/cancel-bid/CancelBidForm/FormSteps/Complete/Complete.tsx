import { FC } from 'react';

import { NFTDetails, NFTDetailsProps, TextContent } from '../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface CompleteProps {
	zna: NFTDetailsProps['zna'];
	onClose: ButtonsProps['onClickPrimaryButton'];
}

export const Complete: FC<CompleteProps> = ({ zna, onClose }) => {
	const textContent = 'Success! Bid accepted and ownership transferred.';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent variant={'success'} textContent={textContent} />

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
