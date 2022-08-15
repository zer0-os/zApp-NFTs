/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';

//- Library Imports
import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import AsyncTable from 'zero-ui/src/components/AsyncTable';
import SubdomainTableCard from './SubdomainTableCard';
import SubdomainTableRow from './SubdomainTableRow';
import PlaceBid from '../modals/PlaceABid/PlaceBid';
import BuyNow from '../modals/BuyNow/BuyNow';

//- Constants Imports
import { COLUMNS, ModalType } from './SubdomainTable.constants';

type SubdomainTableProps = {
	subdomainData: Domain[];
	paymentTokenData: TokenPriceInfo;
};

const SubdomainTable: FC<SubdomainTableProps> = ({
	subdomainData,
	paymentTokenData,
}) => {
	const history = useHistory();

	const [modal, setModal] = useState<{
		isOpen: boolean;
		domainName?: string;
		type?: ModalType.BID | ModalType.BUY;
	}>({
		isOpen: false,
	});

	const handleItemClick = (event: any, domainName?: string) => {
		const clickedButton = event?.target?.className?.indexOf('button') >= 0;
		if (!clickedButton) {
			history.push(`/${domainName}/nfts`);
		}
	};

	const handleOpenModal = (domainName: string, type: ModalType) => {
		setModal({
			isOpen: true,
			domainName,
			type,
		});
	};

	const handleCloseModal = () => {
		setModal({
			...modal,
			isOpen: false,
		});
	};

	return (
		<>
			<AsyncTable
				data={subdomainData}
				itemKey="id"
				columns={COLUMNS}
				rowComponent={(data) => (
					<SubdomainTableRow
						// use itemKey
						key={`${data?.id}`}
						domainId={data?.id}
						domainName={data?.name}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onRowClick={handleItemClick}
						onButtonClick={handleOpenModal}
					/>
				)}
				gridComponent={(data) => (
					<SubdomainTableCard
						// use itemKey
						key={`${data?.id}`}
						domainId={data?.id}
						domainName={data?.name}
						domainMetadataUri={data?.metadataUri}
						paymentTokenData={paymentTokenData}
						onCardClick={handleItemClick}
						onButtonClick={handleOpenModal}
					/>
				)}
				searchKey={{ key: 'name', name: 'message' }}
			/>
			{modal.isOpen && modal.type === ModalType.BID && (
				<PlaceBid domainName={modal.domainName} onClose={handleCloseModal} />
			)}
			{modal.isOpen && modal.type === ModalType.BUY && (
				<BuyNow domainName={modal.domainName} onClose={handleCloseModal} />
			)}
		</>
	);
};

export default memo(SubdomainTable);
