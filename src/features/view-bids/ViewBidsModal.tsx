//- React Imports
import { FC } from 'react';

//- Types Imports
import { BasicModalProps } from '../../lib/types/ui';

//- Components Imports
import { Modal } from '@zero-tech/zui/src/components';

//- Container Imports
import ViewBids from './ViewBids';

export interface ViewBidsModalProps extends BasicModalProps {}

export const ViewBidsModal: FC<ViewBidsModalProps> = ({
	open,
	trigger,
	onOpenChange,
}) => (
	<Modal onOpenChange={onOpenChange} trigger={trigger} open={open}>
		<ViewBids />
	</Modal>
);
