import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/src/components';

import { ViewBids } from './ViewBids';

export interface ViewBidsModalProps extends BasicModalProps {}

export const ViewBidsModal: FC<ViewBidsModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<ViewBids />
	</Modal>
);
