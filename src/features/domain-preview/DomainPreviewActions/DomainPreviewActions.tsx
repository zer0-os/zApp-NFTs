import { FC, useState } from 'react';

import { DropdownMenu } from '@zero-tech/zui/components/DropdownMenu';

import { TransferOwnershipModal } from '../../transfer-ownership';
import { IconDots, IconSend } from '../Icons';

type Action = 'transfer';

export const DomainPreviewActions: FC = () => {
	const [action, setAction] = useState<Action | undefined>();

	const MoreOptionsLabel = () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem',
			}}
		>
			<IconSend /> <div>Transfer Ownership</div>
		</div>
	);

	const actions = [
		{
			id: 'Transfer',
			label: <MoreOptionsLabel />,
			onSelect: () => setAction('transfer'),
		},
	];

	const handleClose = () => setAction(undefined);

	return (
		<>
			<TransferOwnershipModal
				open={action === 'transfer'}
				domainId={'domainId'}
				domainName={'domain?.name'}
				domainTitle={'domainMetadata?.title'}
				domainOwner={'domain?.owner'}
				domainCreator={'domain?.minter'}
				onClose={handleClose}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setAction(undefined);
					}
				}}
			/>

			<DropdownMenu
				items={actions}
				side="bottom"
				alignMenu="end"
				trigger={<IconDots />}
			/>
		</>
	);
};
