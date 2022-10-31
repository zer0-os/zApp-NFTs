import { FC } from 'react';

import { NFTDetails } from '../../ui/NFTDetails';
import { Button } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface CompleteProps {
	zna: string;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ zna, onClose }) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<span className={styles.TextContent} data-variant={'success'}>
					Success! Bid accepted and ownership transferred.
				</span>

				{/* use wizard */}
				<Button className={styles.Button} onPress={onClose}>
					Finish
				</Button>
			</div>
		</>
	);
};
