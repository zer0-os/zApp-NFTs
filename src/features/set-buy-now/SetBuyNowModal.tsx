//- React Imports
import { FC } from 'react';

//- Types Imports
import { BasicModalProps } from '../../lib/types/ui';

//- Components Imports
import { Modal } from '@zero-tech/zui/src/components';

//- Container Imports
import SetBuyNow from './SetBuyNow';

export interface SetBuyNowModalProps extends BasicModalProps {}

export const SetBuyNowModal: FC<SetBuyNowModalProps> = ({
	open,
	trigger,
	onOpenChange,
}) => (
	<Modal onOpenChange={onOpenChange} trigger={trigger} open={open}>
		<SetBuyNow />
	</Modal>
);