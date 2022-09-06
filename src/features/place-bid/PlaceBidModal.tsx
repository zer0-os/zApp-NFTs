//- React Imports
import { FC } from 'react';

//- Types Imports
import { BasicModalProps } from '../../lib/types/ui';

//- Components Imports
import { Modal } from '@zero-tech/zui/src/components';

//- Container Imports
import { PlaceBid } from './PlaceBid';

export interface PlaceBidModalProps extends BasicModalProps {}

export const PlaceBidModal: FC<PlaceBidModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<PlaceBid />
	</Modal>
);
