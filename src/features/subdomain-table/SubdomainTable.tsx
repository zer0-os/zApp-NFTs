/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

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
	const history = useHistory();

	const onTableItemClick = (domainName: string) => {
		history.push(`/${domainName}/nfts`);
	};

	return (
		<AsyncTable
			data={subdomainData}
			itemKey="id"
			columns={COLUMNS}
			rowComponent={(data) => (
				<SubdomainTableRow
					domainId={data?.id}
					domainName={data?.name}
					domainMetadataUri={data?.metadataUri}
					paymentTokenData={paymentTokenData}
					onClick={onTableItemClick}
				/>
			)}
			gridComponent={(data) => (
				<SubdomainTableCard
					domainId={data?.id}
					domainName={data?.name}
					domainMetadataUri={data?.metadataUri}
					paymentTokenData={paymentTokenData}
					onClick={onTableItemClick}
				/>
			)}
			searchKey={{ key: 'name', name: 'message' }}
		/>
	);
};

export default memo(SubdomainTable);
