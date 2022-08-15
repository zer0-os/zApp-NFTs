//- Components Imports
import { Column } from 'zero-ui/src/components/AsyncTable';

export enum ModalType {
	BID = 'BID',
	BUY = 'BUY',
}

export const COLUMNS: Column[] = [
	{ id: 'domain', header: 'Domain', alignment: 'left' },
	{ id: 'volume', header: 'Volume(all time)', alignment: 'right' },
	{ id: 'action', header: '', alignment: 'right' },
];
