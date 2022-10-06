import { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { AsyncTable } from '@zero-tech/zui/components';
import { IconButton } from '../../../features/ui/IconButton';
import { SearchBar } from './SearchBar';
import { SubdomainTableCard } from '../SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow';

import { COLUMNS } from '../SubdomainTable.constants';

//- Assets Imports
import { IconGrid, IconList } from './Icons';

//- Styles Imports
import styles from './SubdomainTable.module.scss';

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
	const [isGridView, setIsGridView] = useState<boolean>(true);

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
		<>
			<Controls isGridView={isGridView} onChangeView={setIsGridView} />

			<AsyncTable
				data={subdomainData}
				itemKey="id"
				columns={COLUMNS}
				rowComponent={Row}
				gridComponent={Card}
				searchKey={{ key: 'name', name: 'message' }}
				isGridView={isGridView}
				isLoading={isSubdomainDataLoading}
			/>
		</>
	);
};

/* @TODO move to zUI */

const Controls = ({
	onChangeView,
	isGridView,
}: {
	onChangeView: (isGridView: boolean) => void;
	isGridView: boolean;
}) => (
	<div className={styles.Controls}>
		<div className={styles.SearchBarContainer}>
			<SearchBar placeholder={'Search by domain name'} onChange={() => {}} />
		</div>
		<div className={styles.IconButtons}>
			<IconButton
				isToggled={!isGridView}
				onClick={() => onChangeView(false)}
				icon={<IconList />}
			/>
			<IconButton
				isToggled={isGridView}
				onClick={() => onChangeView(true)}
				icon={<IconGrid />}
			/>
		</div>
	</div>
);
