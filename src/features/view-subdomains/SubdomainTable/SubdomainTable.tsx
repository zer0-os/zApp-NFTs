import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { AsyncTable } from '@zero-tech/zui/components';
import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import { COLUMNS } from '../SubdomainTable.constants';

import { IconGrid, IconList } from './Icons';

import styles from './SubdomainTable.module.scss';

type SubdomainTableProps = {
	domainId: string;
};

export const SubdomainTable: FC<SubdomainTableProps> = ({ domainId }) => {
	const {
		paymentTokenInfo: paymentTokenData,
		subdomainData,
		isSubdomainDataLoading,
	} = useDataContainer(domainId);

	const history = useHistory();

	const handleItemClick = useCallback((event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	}, []);

	const Row = useCallback(
		(data) => (
			<SubdomainTableRow
				key={`${data?.id}`}
				domainId={data?.id}
				domainName={data?.name}
				domainMetadataUri={data?.metadataUri}
				paymentTokenData={paymentTokenData}
				onRowClick={handleItemClick}
			/>
		),
		[paymentTokenData, handleItemClick],
	);

	const Card = useCallback(
		(data) => (
			<SubdomainTableCard
				key={`${data?.id}`}
				domainId={data?.id}
				domainName={data?.name}
				domainMetadataUri={data?.metadataUri}
				paymentTokenData={paymentTokenData}
				onCardClick={handleItemClick}
			/>
		),
		[paymentTokenData, handleItemClick],
	);

	return (
		<AsyncTable
			data={subdomainData}
			itemKey="id"
			columns={COLUMNS}
			rowComponent={Row}
			gridComponent={Card}
			searchKey={{ key: 'name', name: 'message' }}
			isLoading={isSubdomainDataLoading}
		/>
	);
};
