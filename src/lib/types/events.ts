import {
	DomainTransferEvent,
	DomainMintEvent,
	DomainBidEvent,
	DomainSaleEvent,
	DomainBuyNowSaleEvent,
} from '@zero-tech/zns-sdk';

export type DomainEvent =
	| DomainTransferEvent
	| DomainMintEvent
	| DomainBidEvent
	| DomainSaleEvent
	| DomainBuyNowSaleEvent;
