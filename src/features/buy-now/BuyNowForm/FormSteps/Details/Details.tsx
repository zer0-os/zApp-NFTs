import { FC } from 'react';

import { Step } from '../hooks';
import { getDomainId } from '../../../../../lib/util';
import { useDomainData, useWeb3 } from '../../../../../lib/hooks';
import { useBuyNowData } from '../../../useBuyNowData';

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
	const domainId = getDomainId(zna);

	const { account } = useWeb3();
	const { data: domain } = useDomainData(domainId);
	const { balanceAsString: tokenBalance, isLoading } = useBuyNowData(zna);

	const isOwnedByUser =
		account &&
		domain?.owner &&
		account.toLowerCase() === domain.owner.toLowerCase();

	const primaryButtonText: ButtonsProps['primaryButtonText'] =
		step === Step.DETAILS ? (errorText ? 'Retry' : 'Continue') : 'Confirm';

	const primaryButtonEvent: ButtonsProps['onClickPrimaryButton'] =
		step === Step.DETAILS ? onCheckZAuction : onConfirmBuyNow;

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent
					tokenBalance={tokenBalance}
					isLoading={isLoading}
					isOwnedByUser={isOwnedByUser}
				/>

				{errorText !== undefined && <FormErrorText text={errorText} />}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive={!isOwnedByUser}
					isSecondaryButtonActive
					secondaryButtonText="Cancel"
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={primaryButtonEvent}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};

/*******************
 * TextContent
 *******************/

interface TextContentProps {
	tokenBalance: string;
	isLoading: boolean;
	isOwnedByUser: boolean;
}

const TextContent = ({
	tokenBalance,
	isLoading,
	isOwnedByUser,
}: TextContentProps) =>
	!isOwnedByUser ? (
		<FormUserBalance tokenBalance={tokenBalance} isLoading={isLoading} />
	) : (
		<>You already own this NFT</>
	);
