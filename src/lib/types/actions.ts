export enum ACTION_TYPES {
	Bid,
	SetBuyNow,
	BuyNow,
	UserBid,
}

export type ActionBlock = {
	label: string;
	amountToken: number | string;
	amountUsd: number | string;
	isVisible: boolean;
	dataTestId: string;
	shouldShowBorder?: boolean;
	buttonComponent: (isTextButton?: boolean) => JSX.Element;
};
