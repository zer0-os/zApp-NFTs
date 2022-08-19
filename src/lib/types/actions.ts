export enum ACTION_TYPES {
	Bid,
}

export type ActionBlock = {
	label: string;
	amountToken: number | string;
	amountUsd: number | string;
	isVisible: boolean;
	dataTestId: string;
	shouldShowBorder?: boolean;
	buttonComponent: () => JSX.Element;
};
