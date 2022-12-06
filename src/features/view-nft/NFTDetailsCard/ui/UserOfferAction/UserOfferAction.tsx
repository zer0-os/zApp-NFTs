import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { PlaceBidButton } from '../../../../place-bid';
import { CancelBidButton } from '../../../../cancel-bid';
import { TextStack } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from './UserOfferAction.module.scss';

const cx = classNames.bind(styles);

export interface UserOfferActionProps {
	zna: string;
}

export const UserOfferAction: FC<UserOfferActionProps> = ({ zna }) => {
	const {
		highestBid,
		highestUserBid,
		highestBidUsdConversionString,
		paymentTokenSymbol,
		isUserBid,
		isBuyNow,
		isLoading,
	} = useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const highestUserBidString = highestUserBid
		? formatEthers(highestUserBid?.amount)
		: '-';

	const fiatValue = Boolean(highestBidString)
		? highestBidUsdConversionString
		: 'No offers yet';

	return (
		<div
			className={cx(styles.Container, {
				isSingleAction: !isBuyNow,
			})}
		>
			<TextStack
				className={styles.PrimaryAction}
				label={`Highest offer (${paymentTokenSymbol})`}
				primaryText={{
					text: (
						<TextValue
							tokenValue={highestBidString}
							fiatValue={fiatValue}
							isSingleAction={!isBuyNow}
						/>
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: (
						<PlaceBidButton
							zna={zna}
							trigger={isUserBid ? 'Make new offer' : 'Make offer'}
						/>
					),
					isLoading: isLoading,
				}}
			/>

			{isUserBid && (
				<div className={styles.SecondaryAction}>
					<span className={styles.Subtext}>
						{`Your highest offer: ${highestUserBidString} ${paymentTokenSymbol}`}
					</span>
					<CancelBidButton
						zna={zna}
						trigger={'Cancel offer'}
						variant={'text'}
					/>
				</div>
			)}
		</div>
	);
};

/************
 * TextValue
 ************/

interface TextValueProps {
	tokenValue: string;
	fiatValue: string;
	isSingleAction?: boolean;
}

const TextValue = ({
	tokenValue,
	fiatValue,
	isSingleAction,
}: TextValueProps) => (
	<div
		className={cx(styles.Values, {
			isSingleAction: isSingleAction,
		})}
	>
		<span className={styles.TokenValue}>{tokenValue}</span>
		<span className={styles.FiatValue}>{fiatValue}</span>
	</div>
);
