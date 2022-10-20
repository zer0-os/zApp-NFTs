import { FC, ReactNode } from 'react';

import { usePlaceBidForm } from './hooks/usePlaceBidForm';
import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useDomainData } from '../../../lib/hooks/useDomainData';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';
import { useUserTokenBalance } from '../../../lib/hooks/useUserTokenBalance';
import { usePaymentTokenForDomain } from '../../../lib/hooks/usePaymentTokenForDomain';

import { Details } from './FormSteps';
import { Step } from './PlaceBidForm.constants';
import { Wizard } from '@zero-tech/zui/components';

import styles from './PlaceBidForm.module.scss';

interface PlaceBidFormProps {
	domainId: string;
}

export const PlaceBidForm: FC<PlaceBidFormProps> = ({ domainId }) => {
	const { account } = useWeb3();
	const { data: domain } = useDomainData(domainId);
	const { data: metrics } = useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: walletTokenBalance } = useUserTokenBalance(
		account,
		paymentToken,
	);

	const { step, error, onZAuctionCheck, onZAuctionApprove } =
		usePlaceBidForm(domainId);

	let content: ReactNode;

	const zAuctionConfirmationText = (
		<>
			<p>
				{
					'Before you can place a bid, your wallet needs to approve zAuction. You will only need to do this once. This will cost gas.'
				}
			</p>
			{error !== undefined && (
				<span className={styles.ErrorMessage}>{error}</span>
			)}
		</>
	);

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={domain?.name}
					error={error}
					title={domainMetadata?.title}
					highestBid={metrics?.highestBid}
					creator={domain?.minter}
					walletTokenBalance={walletTokenBalance}
					image={domainMetadata?.image}
					imageFull={domainMetadata?.image_full}
					onConfirm={onZAuctionCheck}
				/>
			);
			break;

		case Step.ZAUCTION_CHECK:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>{'Checking status of zAuction approval...'}</p>
						</div>
					}
				/>
			);
			break;

		case Step.ZAUCTION_APPROVE:
			content = (
				<Wizard.Confirmation
					className={styles.Confirmation}
					message={zAuctionConfirmationText}
					isPrimaryButtonActive
					isSecondaryButtonActive
					primaryButtonText={'Continue'}
					secondaryButtonText={'Cancel'}
					onClickPrimaryButton={onZAuctionApprove}
					onClickSecondaryButton={() => 'onClose Click'}
				/>
			);
			break;

		case Step.WAITING_FOR_WALLET:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>{'Waiting for approval from your wallet...'}</p>
						</div>
					}
				/>
			);
			break;

		case Step.PROCESSING:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>
								{
									'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.'
								}
							</p>
						</div>
					}
				/>
			);
			break;

		case Step.CONFIRM_BID:
			content = (
				<Details
					error={error}
					zna={domain?.name}
					title={domainMetadata?.title}
					highestBid={metrics?.highestBid}
					creator={domain?.minter}
					walletTokenBalance={walletTokenBalance}
					image={domainMetadata?.image}
					imageFull={domainMetadata?.image_full}
					onConfirm={onZAuctionCheck}
				/>
			);
			break;
	}

	return (
		<form>
			<Wizard.Container header="Place A Bid">{content}</Wizard.Container>
		</form>
	);
};
