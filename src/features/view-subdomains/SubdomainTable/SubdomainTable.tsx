import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { AsyncTable } from '@zero-tech/zui/components';
import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import styles from './SubdomainTable.module.scss';

import { COLUMNS } from '../SubdomainTable.constants';
import { useSubdomainData } from '../../../lib/hooks/useSubdomainData';
import { getDomainId } from '../../../lib/util/domains/domains';

type SubdomainTableProps = {
	zna: string;
};

export const SubdomainTable: FC<SubdomainTableProps> = ({ zna }) => {
	const domainId = getDomainId(zna);
	const history = useHistory();

	const { data: subdomains, isLoading: isLoadingSubdomains } =
		useSubdomainData(domainId);

	const handleItemClick = useCallback((event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	}, []);

	const Row = useCallback(
		(data) => (
			<SubdomainTableRow
				key={data.id}
				zna={data.name}
				onClick={handleItemClick}
			/>
		),
		[handleItemClick],
	);

	const Card = useCallback(
		(data) => (
			<SubdomainTableCard
				key={data.id}
				zna={data.name}
				onClick={handleItemClick}
			/>
		),
		[handleItemClick],
	);

	return (
		<AsyncTable
			className={styles.Table}
			data={subdomains}
			itemKey="id"
			columns={COLUMNS}
			rowComponent={Row}
			gridComponent={Card}
			searchKey={{ key: 'name', name: 'zna' }}
			isLoading={isLoadingSubdomains}
		/>
	);
};
