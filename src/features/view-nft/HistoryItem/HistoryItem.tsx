import { DomainEvent } from '../../../lib/types/events';

import moment from 'moment';
import {
	DomainBidEvent,
	DomainBuyNowSaleEvent,
	DomainEventType,
	DomainMintEvent,
	DomainSaleEvent,
	DomainTransferEvent,
	TokenPriceInfo,
} from '@zero-tech/zns-sdk';

import { truncateAddress } from '../../../lib/util/domains/domains';
import { formatEthers } from '../../../lib/util/number/number';

import styles from './HistoryItem.module.scss';

type HistoryItemProps = {
	item: DomainEvent;
	paymentToken: TokenPriceInfo;
};

export const HistoryItem = ({ item, paymentToken }: HistoryItemProps) => {
	switch (item.type) {
		case DomainEventType.bid:
			item = item as DomainBidEvent;

			return (
				<li className={styles.Container}>
					<div>
						<b>
							<a
								href={'https://etherscan.io/address/' + item.bidder!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.bidder!)}
							</a>
						</b>{' '}
						made an offer of{' '}
						<b>
							{formatEthers(item.amount!)} {paymentToken?.name}
						</b>
					</div>
					<div>
						<b>{moment(Number(item!.timestamp)).fromNow()}</b>
					</div>
				</li>
			);

		case DomainEventType.mint:
			item = item as DomainMintEvent;

			return (
				<li className={styles.Container}>
					<div>
						<b>
							<a
								href={'https://etherscan.io/address/' + item.minter!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.minter!)}
							</a>
						</b>{' '}
						minted the domain
					</div>
					<div>
						<b>{moment(Number(item.timestamp!) * 1000).fromNow()}</b>
					</div>
				</li>
			);

		case DomainEventType.transfer:
			item = item as DomainTransferEvent;

			return (
				<li className={styles.Container}>
					<div>
						<b>
							<a
								href={'https://etherscan.io/address/' + item.from!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.from!)}
							</a>
						</b>{' '}
						transferred ownership to{' '}
						<b>
							<a
								href={'https://etherscan.io/address/' + item.to!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.to!)}
							</a>
						</b>{' '}
					</div>
					<div>
						<b>{moment(Number(item.timestamp) * 1000).fromNow()}</b>
					</div>
				</li>
			);

		case DomainEventType.buyNow:
			item = item as DomainSaleEvent;

			return (
				<li className={styles.Container}>
					<div>
						<b>
							<a
								href={'https://etherscan.io/address/' + item.buyer!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.buyer!)}
							</a>
						</b>{' '}
						bought this NFT from{' '}
						<b>
							<a
								href={'https://etherscan.io/address/' + item.seller!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.seller!)}
							</a>
						</b>{' '}
						{item.amount && (
							<>
								for{' '}
								<b>
									{formatEthers(item.amount!)} {paymentToken?.name}
								</b>
							</>
						)}
					</div>
					<div>
						<b>{moment(Number(item.timestamp) * 1000).fromNow()}</b>
					</div>
				</li>
			);

		case DomainEventType.sale:
			item = item as DomainBuyNowSaleEvent;

			return (
				<li className={styles.Container}>
					<div>
						<b>
							<a
								href={'https://etherscan.io/address/' + item.seller!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.seller!)}
							</a>
						</b>{' '}
						sold this NFT to{' '}
						<b>
							<a
								href={'https://etherscan.io/address/' + item.buyer!}
								target="_blank"
								rel="noreferrer"
							>
								{truncateAddress(item.buyer!)}
							</a>
						</b>{' '}
						{item.amount && (
							<>
								for{' '}
								<b>
									{formatEthers(item.amount!)}
									{paymentToken?.name}
								</b>
							</>
						)}
					</div>
					<div>
						<b>{moment(Number(item.timestamp) * 1000).fromNow()}</b>
					</div>
				</li>
			);

		default:
			return <></>;
	}
};
