//- React Imports
import { FC } from 'react';

//- Types Imports
import { BasicModalProps } from '../../lib/types/ui';

//- Components Imports
import { Modal } from '@zero-tech/zui/src/components';

//- Container Imports
import BuyNow from './BuyNow';

export interface BuyNowModalProps extends BasicModalProps {}

export const BuyNowModal: FC<BuyNowModalProps> = ({
	open,
	trigger,
	onOpenChange,
}) => (
	<Modal onOpenChange={onOpenChange} trigger={trigger} open={open}>
		<BuyNow />
	</Modal>
);