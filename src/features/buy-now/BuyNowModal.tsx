import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/src/components';

import { BuyNow } from './BuyNow';

export interface BuyNowModalProps extends BasicModalProps {}

export const BuyNowModal: FC<BuyNowModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<BuyNow />
	</Modal>
);
