import { FC } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails, TextContentProps } from '../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	bid: Bid;
	errorText: TextContentProps['errorText'];
	onNext: ButtonsProps['onClickPrimaryButton'];
}

export const Details: FC<DetailsProps> = ({ zna, bid, errorText, onNext }) => {
	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onNext}
				/>
			</div>
		</>
	);
};
