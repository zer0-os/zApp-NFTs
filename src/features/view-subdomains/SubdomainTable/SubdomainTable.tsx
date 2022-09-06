import { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { AsyncTable } from '@zero-tech/zui/src/components';
import { SubdomainTableCard } from '../SubdomainTableCard/SubdomainTableCard';
import { SubdomainTableRow } from '../SubdomainTableRow/SubdomainTableRow';

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
	const [isGridView, setIsGridView] = useState<boolean>(true);

	const handleItemClick = (event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	};

	const changeView = useCallback(
		(isGridView: boolean) => {
			setIsGridView(isGridView);
		},
		[setIsGridView],
	);

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					color: 'black',
				}}
			>
				<button onClick={() => changeView(false)}>Row</button>
				<button onClick={() => changeView(true)}>Grid</button>
			</div>
			<AsyncTable
				data={subdomainData}
				itemKey="id"
				columns={COLUMNS}
				rowComponent={(data) => (
					<SubdomainTableRow
						// todo: use itemKey
						key={`${data?.id}`}
						domainId={data?.id}
						domainName={data?.name}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onRowClick={handleItemClick}
					/>
				)}
				gridComponent={(data) => (
					<SubdomainTableCard
						// todo: use itemKey
						key={`${data?.id}`}
						domainId={data?.id}
						domainName={data?.name}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onCardClick={handleItemClick}
					/>
				)}
				searchKey={{ key: 'name', name: 'message' }}
				isGridView={isGridView}
				isLoading={isSubdomainDataLoading}
			/>
		</>
	);
};
