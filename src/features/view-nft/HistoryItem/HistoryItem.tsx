import { ReactNode } from 'react';

import moment from 'moment';
import {
	DomainBidEvent,
	DomainBuyNowSaleEvent,
	DomainEventType,
	DomainMintEvent,
	DomainSaleEvent,
	DomainTransferEvent,
} from '@zero-tech/zns-sdk';
import { DomainEvent } from '../../../lib/types/events';
import { truncateAddress } from '../../../lib/util/domains/domains';
import { formatEthers } from '../../../lib/util/number/number';

import styles from './HistoryItem.module.scss';

type HistoryItemProps = {
	item: DomainEvent;
	tokenName?: string;
};

export const HistoryItem = ({ item, tokenName }: HistoryItemProps) => {
	const tokenString = tokenName ? ' ' + tokenName : '';

	switch (item.type) {
		case DomainEventType.bid:
			item = item as DomainBidEvent;
			return (
				<Container>
					<Label
						actingAddress={item.bidder!}
						actionText="made an offer of"
						amount={formatEthers(item.amount!) + tokenString}
					/>
					<Date timestamp={item.timestamp!} />
				</Container>
			);

		case DomainEventType.mint:
			item = item as DomainMintEvent;
			return (
				<Container>
					<Label actingAddress={item.minter!} actionText="minted the domain" />
					{/* NOTE: multiplying by 1000 here as mint timestamps are in seconds for some reason */}
					<Date timestamp={(Number(item.timestamp!) * 1000).toString()} />
				</Container>
			);

		case DomainEventType.transfer:
			item = item as DomainTransferEvent;
			return (
				<Container>
					<Label
						actingAddress={item.from}
						actionText={'transferred this domain to'}
						secondaryAddress={item.to}
					/>
					<Date timestamp={item.timestamp!} />
				</Container>
			);

		case DomainEventType.buyNow:
			item = item as DomainSaleEvent;
			return (
				<Container>
					<Label
						actingAddress={item.buyer!}
						actionText="brought this NFT from"
						secondaryAddress={item.seller}
						amount={formatEthers(item.amount!) + tokenString}
					/>
					<Date timestamp={item.timestamp!} />
				</Container>
			);

		case DomainEventType.sale:
			item = item as DomainBuyNowSaleEvent;
			return (
				<Container>
					<Label
						actingAddress={item.seller!}
						actionText={'sold this NFT to'}
						secondaryAddress={item.buyer}
						amount={formatEthers(item.amount!) + tokenString}
					/>
					<div>
						<b>{moment(Number(item.timestamp!) * 1000).fromNow()}</b>
					</div>
				</Container>
			);

		default:
			return <></>;
	}
};

/*******************
 * Container
 *******************/

interface ContainerProps {
	children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
	return <li className={styles.Container}>{children}</li>;
};

/*******************
 * Address
 *******************/

interface AddressProps {
	address: string;
}

const Address = ({ address }: AddressProps) => {
	return (
		<b>
			<a
				href={'https://etherscan.io/address/' + address}
				target="_blank"
				rel="noreferrer"
			>
				{truncateAddress(address)}
			</a>
		</b>
	);
};

/*******************
 * Label
 *******************/

interface LabelProps {
	actingAddress: string;
	actionText: string;
	secondaryAddress?: string;
	amount?: string;
}

const Label = ({
	actingAddress,
	actionText,
	secondaryAddress,
	amount,
}: LabelProps) => {
	return (
		<div className={styles.Label}>
			<Address address={actingAddress} /> {actionText}
			{secondaryAddress && (
				<>
					{' '}
					<Address address={secondaryAddress} />
				</>
			)}
			{amount && (
				<>
					{secondaryAddress ? ' for ' : ' '}
					<b>{amount}</b>
				</>
			)}
		</div>
	);
};

/*******************
 * Date
 *******************/

interface DateProps {
	timestamp: string;
}

const Date = ({ timestamp }: DateProps) => {
	return (
		<div>
			<b>{moment(Number(timestamp)).fromNow()}</b>
		</div>
	);
};
