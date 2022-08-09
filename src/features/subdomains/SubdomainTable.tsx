/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC, memo } from 'react';

//- Library Imports
import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import AsyncTable, { Column } from 'zero-ui/src/components/AsyncTable';
import SubdomainTableCard from './SubdomainTableCard';
import SubdomainTableRow from './SubdomainTableRow';

type SubdomainTableProps = {
	subdomainData: Domain[];
	paymentTokenData: TokenPriceInfo;
};

export const COLUMNS: Column[] = [
	{ id: 'domain', header: 'Domain', alignment: 'left' },
	{ id: 'volume', header: 'Volume(all time)', alignment: 'left' },
];

const SubdomainTable: FC<SubdomainTableProps> = ({
	subdomainData,
	paymentTokenData,
}) => {
	return (
		<AsyncTable
			data={subdomainData}
			itemKey="id"
			columns={COLUMNS}
			rowComponent={(data) => (
				<SubdomainTableRow domain={data} paymentTokenData={paymentTokenData} />
			)}
			gridComponent={(data) => (
				<SubdomainTableCard domain={data} paymentTokenData={paymentTokenData} />
			)}
			searchKey={{ key: 'name', name: 'message' }}
		/>
	);
};

export default memo(SubdomainTable);
