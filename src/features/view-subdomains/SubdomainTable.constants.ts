import { Column } from '@zero-tech/zui/components/AsyncTable';

export const COLUMNS: Column[] = [
	{ id: 'domain', header: 'Domain', alignment: 'left' },
	{ id: 'volume', header: 'Volume (all time)', alignment: 'right' },
	{ id: 'action', header: '', alignment: 'right' },
];
