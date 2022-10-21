import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { AsyncTable } from '@zero-tech/zui/components';
import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import styles from './SubdomainTable.module.scss';

import { COLUMNS } from '../SubdomainTable.constants';

type SubdomainTableProps = {
	subdomainData: Domain[];
	paymentTokenData: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
};

export const SubdomainTable: FC<SubdomainTableProps> = ({
	subdomainData,
	paymentTokenData,
	isSubdomainDataLoading,
}) => {
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
			className={styles.Table}
			data={subdomainData}
			itemKey="id"
			columns={COLUMNS}
			rowComponent={Row}
			gridComponent={Card}
			searchKey={{ key: 'name', name: 'zna' }}
			isLoading={isSubdomainDataLoading}
		/>
	);
};
