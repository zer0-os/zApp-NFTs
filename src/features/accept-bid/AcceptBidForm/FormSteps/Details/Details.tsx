import { FC } from 'react';

import { NFTDetails } from '../../ui';
import { Button, Input } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface DetailsProps {
	error: string;
	domainId: string;
	bidAmount: string;
	setBidAmount?: (bidAmount: string) => void;
	onCheckZAuction?: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	error,
	domainId,
	bidAmount,
	setBidAmount,
	onCheckZAuction,
	onClose,
}) => {
	return <Button>{''}</Button>;
};
