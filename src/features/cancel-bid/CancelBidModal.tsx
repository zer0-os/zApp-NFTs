import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/src/components';

import { CancelBid } from './CancelBid';

export interface CancelBidModalProps extends BasicModalProps {}

export const CancelBidModal: FC<CancelBidModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<CancelBid />
	</Modal>
);
