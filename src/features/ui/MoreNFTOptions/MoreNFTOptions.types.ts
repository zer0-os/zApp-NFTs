import { ReactNode } from 'react';

/* All possible options - i.e. 'transfer', 'create token' */
export type Option = 'transfer';

/* More options structure */
export type MoreOptions = {
	id: string;
	label: ReactNode;
	onSelect: () => void;
};
