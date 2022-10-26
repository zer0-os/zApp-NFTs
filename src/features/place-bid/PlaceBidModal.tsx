import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { PlaceBid } from './PlaceBid';

export interface PlaceBidModalProps extends BasicModalProps {}

export const PlaceBidModal: FC<PlaceBidModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<PlaceBid />
	</Modal>
);
