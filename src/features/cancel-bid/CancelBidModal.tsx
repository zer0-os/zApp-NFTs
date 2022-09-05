//- React Imports
import { FC } from 'react';

//- Types Imports
import { BasicModalProps } from '../../lib/types/ui';

//- Components Imports
import { Modal } from '@zero-tech/zui/src/components';

//- Container Imports
import CancelBid from './CancelBid';

export interface CancelBidModalProps extends BasicModalProps {}

export const CancelBidModal: FC<CancelBidModalProps> = ({
	open,
	trigger,
	onOpenChange,
}) => (
	<Modal onOpenChange={onOpenChange} trigger={trigger} open={open}>
		<CancelBid />
	</Modal>
);