//- React Imports
import { FC, memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

//- Library Imports
import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import { AsyncTable } from '@zero-tech/zui/src/components/AsyncTable/AsyncTable';
import SubdomainTableCard from '../SubdomainTableCard/SubdomainTableCard';
import SubdomainTableRow from '../SubdomainTableRow/SubdomainTableRow';

//- Constants Imports
import { COLUMNS } from '../SubdomainTable.constants';
import { ModalType } from '../../../../lib/constants/modals';

//- Hooks Imports
import { useModal } from '../../../../lib/hooks/useModal';

type SubdomainTableProps = {
	accountId: string;
	subdomainData: Domain[];
	paymentTokenData: TokenPriceInfo;
	isSubdomainDataLoading?: boolean;
	openModal: (domainName: string, type: ModalType) => void;
};

const SubdomainTable: FC<SubdomainTableProps> = ({
	accountId,
	subdomainData,
	paymentTokenData,
	isSubdomainDataLoading,
	openModal,
}) => {
	const history = useHistory();
	const [isGridView, setIsGridView] = useState<boolean>();

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
						accountId={accountId}
						domainId={data?.id}
						domainName={data?.name}
						domainOwner={data?.owner}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onRowClick={handleItemClick}
						onButtonClick={openModal}
					/>
				)}
				gridComponent={(data) => (
					<SubdomainTableCard
						// todo: use itemKey
						key={`${data?.id}`}
						accountId={accountId}
						domainId={data?.id}
						domainName={data?.name}
						domainOwner={data?.owner}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onCardClick={handleItemClick}
						onButtonClick={openModal}
					/>
				)}
				searchKey={{ key: 'name', name: 'message' }}
				isGridView={isGridView}
				isLoading={isSubdomainDataLoading}
			/>
		</>
	);
};

export default memo(SubdomainTable);
