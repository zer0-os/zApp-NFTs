import { FC, useState } from 'react';

import { BasicModalProps } from '../../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { PlaceBid } from '../PlaceBid';

export interface PlaceBidModalProps extends BasicModalProps {
	domainId: string;
}

export const PlaceBidModal: FC<PlaceBidModalProps> = ({
	domainId,
	...modalProps
}) => (
	<Modal {...modalProps}>
		<PlaceBid domainId={domainId} />
	</Modal>
);
