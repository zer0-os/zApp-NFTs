import { FC } from 'react';

import { useBuyNowData } from '../../../useBuyNowData';
import { Step } from '../../FormSteps/hooks';
import { NFTDetails } from '../ui';
import { FormErrorText, FormUserBalance } from '../../../../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	step: Step;
	errorText: string;
	onCheckZAuction?: () => void;
	onConfirmBuyNow?: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	step,
	errorText,
	onCheckZAuction,
	onConfirmBuyNow,
	onClose,
}) => {
	const { balanceAsString: tokenBalance, isLoading } = useBuyNowData(zna);

	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<FormUserBalance tokenBalance={tokenBalance} isLoading={isLoading} />

				{errorText !== undefined && <FormErrorText text={errorText} />}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					isSecondaryButtonActive
					secondaryButtonText="Cancel"
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onCheckZAuction}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};
