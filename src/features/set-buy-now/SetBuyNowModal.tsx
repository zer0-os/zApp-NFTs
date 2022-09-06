import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/src/components';

import { SetBuyNow } from './SetBuyNow';

export interface SetBuyNowModalProps extends BasicModalProps {}

export const SetBuyNowModal: FC<SetBuyNowModalProps> = ({ ...modalProps }) => (
	<Modal {...modalProps}>
		<SetBuyNow />
	</Modal>
);
