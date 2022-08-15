//- React Imports
import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

//- Library Imports
import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import AsyncTable from 'zero-ui/src/components/AsyncTable';
import SubdomainTableCard from './SubdomainTableCard';
import SubdomainTableRow from './SubdomainTableRow';

//- Constants Imports
import { COLUMNS } from './SubdomainTable.constants';
import { ModalType } from '../../lib/constants/modals';

//- Hooks Imports
import { useModal } from '../../lib/hooks/useModal';

type SubdomainTableProps = {
	accountId: string;
	subdomainData: Domain[];
	paymentTokenData: TokenPriceInfo;
};

const SubdomainTable: FC<SubdomainTableProps> = ({
	accountId,
	subdomainData,
	paymentTokenData,
}) => {
	const history = useHistory();
	const { openModal, closeModal } = useModal();

	const handleItemClick = (event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	};

	const onButtonClick = (domainName: string, type: ModalType) =>
		type !== ModalType.CONNECT_WALLET_PROMPT
			? openModal({
					modalType: type,
					contentProps: {
						domainName: domainName,
						onClose: closeModal,
					},
			  })
			: openModal({
					modalType: type,
					contentProps: {
						onClose: closeModal,
					},
			  });

	return (
		<>
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
						onButtonClick={onButtonClick}
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
						onButtonClick={onButtonClick}
					/>
				)}
				searchKey={{ key: 'name', name: 'message' }}
			/>
		</>
	);
};

export default memo(SubdomainTable);
